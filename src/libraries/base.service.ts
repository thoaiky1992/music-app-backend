import { Model } from 'mongoose';

export default class BaseService<T> {
  async findWithOptions(model: Model<T>, findOptions: any = {}) {
    const rows = await model
      .find({ ...findOptions?.where })
      .select(findOptions?.select)
      .populate(findOptions?.populate)
      .skip(findOptions?.skip)
      .limit(findOptions?.limit)
      .sort(findOptions?.sort)
      .exec();
    const count = await this.countWithOptions(model, findOptions);
    return { rows, count };
  }

  async findOneWithOptions(model: Model<T>, id, findOptions: any = {}) {
    return await model
      .findOne({ _id: id, ...findOptions?.where })
      .select(findOptions?.select)
      .populate(findOptions?.populate)
      .exec();
  }

  async findByIdWithOptions(model: Model<T>, id, findOptions: any = {}) {
    return await model
      .findById(id, { ...findOptions?.where })
      .select(findOptions?.select)
      .populate(findOptions?.populate)
      .exec();
  }

  async findByIdAndUpdate(model: Model<T>, id, findOptions: any = {}) {
    return model.findByIdAndUpdate(id, findOptions, { new: true });
  }

  async findByIdAndDelete(model: Model<T>, id) {
    return model.deleteOne({ _id: id }, { new: true });
  }

  async countWithOptions(model: Model<T>, findOptions: any = {}) {
    return model
      .find({ ...findOptions?.where })
      .select(findOptions?.select)
      .populate(findOptions?.populate || '')
      .skip(findOptions?.skip)
      .limit(findOptions?.limit)
      .countDocuments();
  }
}
