const slugify = require('slugify');

const generateUniqueSlug = (Model, sourceField, slugField) => {
  return async function (next) {
    if (!this.isModified(sourceField)) {
      return next();
    }

    let baseSlug = slugify(this[sourceField], { lower: true, strict: true });
    this[slugField] = baseSlug;

    let count = 1;
    while (await Model.exists({ [slugField]: this[slugField] })) {
      this[slugField] = `${baseSlug}-${count}`;
      count++;
    }

    next();
  };
}

module.exports = generateUniqueSlug;