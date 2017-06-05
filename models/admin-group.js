'use strict';
const Joi = require('joi');
const MongoModels = require('mongo-models');
const Slug = require('slug');


class AdminGroup extends MongoModels {
    static create(name, callback) {

        const document = {
            _id: Slug(name).toLowerCase(),
            name
        };

        console.log("is insert doc....................create group: root"); console.log(document);//{ _id: 'root', name: 'Root' }

        this.insertOne(document, (err, docs) => {

            if (err) {
                return callback(err);
            }

            callback(null, docs[0]);
        });
    }

    hasPermissionTo(permission) {

        if (this.permissions && this.permissions.hasOwnProperty(permission)) {
            return this.permissions[permission];
        }

        return false;
    }
}


AdminGroup.collection = 'admingroups';


AdminGroup._idClass = String;


AdminGroup.schema = Joi.object().keys({
    _id: Joi.string(),
    name: Joi.string().required(),
    permissions: Joi.object().description('{ permission: boolean, ... }')
});


module.exports = AdminGroup;
