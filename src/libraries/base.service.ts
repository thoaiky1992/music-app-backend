import { Model } from 'mongoose';

export default class BaseService<T> {
  async findWithOptions(model: Model<T>, options: any = {}) {
    const { findOptions } = options;
    const rows = await model
      .find({ ...findOptions?.where })
      .select(findOptions?.select)
      .populate(findOptions?.populate)
      .skip(findOptions?.skip)
      .limit(findOptions?.limit)
      .sort(findOptions?.sort)
      .exec();
    const count = await this.countWithOptions(model, options);
    return { rows, count };
  }

  async findOneWithOptions(model: Model<T>, id, options: any = {}) {
    const { findOptions } = options;
    return await model
      .findOne({ _id: id, ...findOptions?.where })
      .select(findOptions?.select)
      .populate(findOptions?.populate)
      .exec();
  }

  async findByIdWithOptions(model: Model<T>, id, options: any = {}) {
    const { findOptions } = options;
    return await model
      .findById(id, { ...findOptions?.where })
      .select(findOptions?.select)
      .populate(findOptions?.populate)
      .exec();
  }

  async findByIdAndUpdate(model: Model<T>, id, options: any = {}) {
    return model.findByIdAndUpdate(id, options, { new: true });
  }

  async findByIdAndDelete(model: Model<T>, id) {
    return model.deleteOne({ _id: id }, { new: true });
  }

  async countWithOptions(model: Model<T>, options: any = {}) {
    const { findOptions } = options;
    return model
      .find({ ...findOptions?.where })
      .select(findOptions?.select)
      .populate(findOptions?.populate || '')
      .skip(findOptions?.skip)
      .limit(findOptions?.limit)
      .countDocuments();
  }
}
