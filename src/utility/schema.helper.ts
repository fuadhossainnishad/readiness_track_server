import { Schema, SchemaType } from "mongoose"

const RemoveSchemaFields = (schema: Schema, fields: string[]): Schema => {

    const clone = new Schema({}, { timestamps: true });

    for (const [key, path] of Object.entries(schema.paths)) {
        if (!fields.includes(key)) {
            clone.add({ [key]: (path as SchemaType).options });
        }
    }

    return clone;
}

const SchemaHelper = {
    RemoveSchemaFields,
}

export default SchemaHelper 