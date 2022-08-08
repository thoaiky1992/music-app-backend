import { Model } from 'mongoose';

export default class BaseService<ModelDocument> {
  private _model: Model<ModelDocument>;
  constructor(model: Model<ModelDocument>) {
    this._model = model;
  }
  async findWithOptions(findOptions: any = {}) {
    const rows = await this._model
      .find(findOptions?.where)
      .select(findOptions?.select)
      .populate(findOptions?.populate)
      .skip(findOptions?.skip)
      .limit(findOptions?.limit)
      .sort(findOptions?.sort)
      .exec();
    const count = await this.countWithOptions(findOptions);
    return { rows, count };
  }

  async findOneWithOptions(id, findOptions: any = {}) {
    return await this._model
      .findOne({ _id: id, ...findOptions?.where })
      .select(findOptions?.select)
      .populate(findOptions?.populate)
      .skip(findOptions?.skip)
      .limit(findOptions?.limit)
      .sort(findOptions?.sort)
      .exec();
  }

  async findByIdWithOptions(id, findOptions: any = {}) {
    return await this._model
      .findById(id, findOptions?.where)
      .select(findOptions?.select)
      .populate(findOptions?.populate)
      .skip(findOptions?.skip)
      .limit(findOptions?.limit)
      .sort(findOptions?.sort)
      .exec();
  }

  async findByIdAndUpdate(id, findOptions: any = {}) {
    return this._model.findByIdAndUpdate(id, findOptions, { new: true });
  }

  async findByIdAndDelete(id) {
    return this._model.deleteOne({ _id: id }, { new: true });
  }

  async countWithOptions(findOptions: any = {}) {
    return this._model
      .find(findOptions?.where)
      .select(findOptions?.select)
      .populate(findOptions?.populate)
      .skip(findOptions?.skip)
      .limit(findOptions?.limit)
      .sort(findOptions?.sort)
      .countDocuments();
  }
}
