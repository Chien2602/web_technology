const slugify = require('slugify');

const generateUniqueSlug = (sourceField, slugField) => {
    return async function (next) {
        if (!this.isModified(sourceField)) {
            return next();
        }

        const baseSlug = slugify(this[sourceField], {lower: true, strict: true});
        let slug = baseSlug;
        let count = 1;

        const Model = this.constructor;

        let existing = await Model.findOne({[slugField]: slug});
        while (existing) {
            slug = `${baseSlug}-${count++}`;
            existing = await Model.findOne({[slugField]: slug});
        }

        this[slugField] = slug;
        next();
    };
};

module.exports = generateUniqueSlug;