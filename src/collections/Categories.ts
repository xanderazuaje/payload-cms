import { CollectionConfig } from "payload/types";
import {isAdmin, isAdminOrSelf, postsPolicyAccess} from "../acess";
import {timestamp} from "payload/dist/utilities/timestamp";

const Categories: CollectionConfig = {
    slug: "categories",
    access: {
        read: () => true,
        create: isAdmin,
        delete: isAdmin,
        update: isAdmin
    },
    labels: {
        singular: 'Categoría',
        plural: 'Categorías'
    },
    admin: {
        useAsTitle: "title",
    },
    fields: [
        {
            name: 'title',
            label: 'Nombre',
            type: 'text',
            required: true,
        },
        {
            name: "slug",
            label: "Slug",
            type: "text"
        }
    ],
};

export default Categories;
