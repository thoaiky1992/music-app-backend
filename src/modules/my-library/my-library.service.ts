import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import BaseService from '@src/libraries/base.service';
import {
  MyLibrary,
  MyLibraryDocument,
} from '@src/modules/my-library/my-library.schema';
import { MyLibraryDto } from '@src/modules/my-library/my-library.dto';
import { Types } from 'mongoose';
import { GlobalGateway } from '@src/gateway/gateway';
import {
  SOCKET_MY_LIBRARY_ADD_THIS_SONG,
  SOCKET_MY_LIBRARY_REMOVE_THIS_SONG,
} from '@src/constants';
@Injectable()
export class MyLibraryService extends BaseService<MyLibraryDocument> {
  constructor(
    @InjectModel(MyLibrary.name)
    private myLibraryModel: Model<MyLibraryDocument>,
  ) {
    super(myLibraryModel);
  }
  async createOne(myLibraryDto: MyLibraryDto): Promise<MyLibrary> {
    const item = await this.myLibraryModel.findOne({ user: myLibraryDto.user });

    if (item) {
      if (!item.songs.includes(new Types.ObjectId(myLibraryDto.songs[0]))) {
        item.songs.push(new Types.ObjectId(myLibraryDto.songs[0]));
        await item.save();
        GlobalGateway.server.emit(
          SOCKET_MY_LIBRARY_ADD_THIS_SONG,
          myLibraryDto,
        );
      }
      return;
    }
    const createdMyLibrary = new this.myLibraryModel(myLibraryDto);
    await createdMyLibrary.save();
    await GlobalGateway.server.emit(
      SOCKET_MY_LIBRARY_ADD_THIS_SONG,
      myLibraryDto,
    );
  }

  async removeThisSong(body: any = {}) {
    const item = await this.myLibraryModel.findOne(body.filter);
    if (item.songs.length === 1) {
      await item.remove();
    } else {
      await this.myLibraryModel.findOneAndUpdate(body.filter, body.update);
    }

    GlobalGateway.server.emit(SOCKET_MY_LIBRARY_REMOVE_THIS_SONG, {
      userId: body.filter.user,
      songId: body.update.$pull.songs,
    });
  }

  async getMany(
    options: any = {},
  ): Promise<{ rows: MyLibrary[]; count: number }> {
    return await this.findWithOptions(options);
  }
}
