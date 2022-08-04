import { Model } from 'mongoose';

export default class BaseService<T> {
  async findWithOptions(model: Model<T>, body) {
    const { findOptions } = body;
    const rows = await model
      .find({ ...findOptions?.where })
      .select(findOptions?.select)
      .populate(findOptions?.populate)
      .skip(findOptions?.skip)
      .limit(findOptions?.limit)
      .exec();
    const count = await this.countWithOptions(model, body);
    return { rows, count };
  }

  async findOneWithOptions(model: Model<T>, id, body) {
    const { findOptions } = body;
    return await model
      .findOne({ _id: id, ...findOptions?.where })
      .select(findOptions?.select)
      .populate(findOptions?.populate)
      .exec();
  }

  async findByIdWithOptions(model: Model<T>, id, body) {
    const { findOptions } = body;
    return await model
      .findById(id, { ...findOptions?.where })
      .select(findOptions?.select)
      .populate(findOptions?.populate)
      .exec();
  }

  async findByIdAndUpdate(model: Model<T>, id, body) {
    return await model.findByIdAndUpdate(id, body, { new: true });
  }

  async findByIdAndDelete(model: Model<T>, id) {
    return await model.deleteOne({ _id: id }, { new: true });
  }

  async countWithOptions(model: Model<T>, body) {
    const { findOptions } = body;
    return await model
      .find({ ...findOptions?.where })
      .select(findOptions?.select)
      .populate(findOptions?.populate || '')
      .skip(findOptions?.skip)
      .limit(findOptions?.limit)
      .countDocuments();
  }
}
