import { CollectionConfig } from "payload/types";
import {isAdminFieldLevel, isAdminOrSelf, postsPolicyAccess, postsPolicyEdit} from "../acess";
import {slateEditor} from "@payloadcms/richtext-slate";

const Posts: CollectionConfig = {
    slug: "posts",
    versions: {
        drafts: {
            autosave: true,
            validate: true
        }
    },
    labels: {
        singular: 'Post',
        plural: 'Posts'
    },
    admin: {
        useAsTitle: "title",
        defaultColumns: ['title', 'anon', 'createdAt']
    },
    access: {
        read: postsPolicyAccess,
        create: isAdminOrSelf,
        delete: postsPolicyEdit,
        update: postsPolicyEdit
    },
    fields: [
        {
            name: 'title',
            label: 'Título',
            type: 'text',
            required: true,
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            required: true
        },
        {
            name: 'content',
            label: 'Contenido',
            type: 'richText',
            editor: slateEditor({
                admin: {
                    elements: [
                        'h2',
                        'h3',
                        'h4',
                        'link',
                        'blockquote',
                        'upload'
                    ],
                    leaves: [
                        'bold',
                        'italic',
                        'strikethrough'
                    ]
                }
            }),
            required: true,
        },
        {
            name: 'anon',
            type: 'checkbox',
            label: 'Publicar anónimamente',
            defaultValue: true,
        },
        {
            name: 'bannerImage',
            label: 'Imagen de banner',
            type: 'upload',
            relationTo: 'media',
            required: true,
            filterOptions: {
                mimeType: {contains: 'image'}
            }
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'users',
            defaultValue: ({user}) => user.id ?? null,
            access: {
                update: isAdminFieldLevel,
                create: isAdminFieldLevel
            }
        },
    ],
    hooks: {
        beforeRead: [
            async ({doc, req: {user }}) => {
            if ((!user || doc.author !== user.id || doc.a !== user.roles.includes('admin')) && doc.anon === true)
                doc.author = null
            return doc
            }
        ],
    }
};

export default Posts;