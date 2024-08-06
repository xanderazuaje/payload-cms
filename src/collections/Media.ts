import {CollectionConfig, PayloadRequest} from 'payload/types';
import {isAdminFieldLevel, isAdminOrSelf} from "../acess";
import {request} from "express";

const Media: CollectionConfig = {
    slug: 'media',
    admin: {
        useAsTitle: 'alt',
    },
    access: {
        read: ({req: {user}}) => {
            return {
                or: [
                    {
                        author: {
                            equals: user?.id,
                        },
                    },
                    {
                        filesize: {
                            greater_than: 0
                        }
                    }
                ],
            };
        },
        create: ({req: {user}}) => !!user,
        update: ({req: {user}}) => {
            return {
                author: {
                    equals: user?.id,
                },
            };
        },
        delete: ({req: {user}}) => {
            return {
                author: {
                    equals: user?.id,
                },
            };
        },
    },
        fields: [
        {
            name: "alt",
            type: "text"
        },
        {
            name: "author",
            type: 'relationship',
            relationTo: 'users',
            defaultValue: ({user}) => {
                if (user)
                    return user.id
            },
            required: true,
            hidden: true
        }
    ],
    upload: {
        staticURL: '/media',
        staticDir: 'media',
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre',
            },
            {
                name: 'card',
                width: 768,
                height: 1024,
                position: 'centre',
            },
            {
                name: 'tablet',
                width: 1024,
                height: null,
                position: 'centre',
            },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
    },
    hooks: {
        beforeChange: [
            async ({req, data}) => {
                if (req.user ) {
                    if (data.anon == true)
                        data.author = '0'
                    else
                        data.author = req.user.id
                }
                return data
            }
        ]
    }
};

export default Media;