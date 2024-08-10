import {CollectionConfig} from 'payload/types'
import {isAdmin, isAdminFieldLevel, isAdminOrSelf} from "../acess";
import {adjectives, colors, Config, names, uniqueNamesGenerator} from "unique-names-generator";

const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'User',
    plural: 'Users'
  },
  auth: {
    depth: 0
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    create: isAdmin,
    delete: isAdminOrSelf
  },
  fields: [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      required: true,
      defaultValue: () => {
        const config: Config = {
          dictionaries: [names, colors, adjectives],
          separator: ' ',
          length: 2
        }
        return uniqueNamesGenerator(config)
      }
    },
    {
      name: 'description',
      label: 'Descripción',
      type: 'textarea'
    },
    {
      name: 'pfp',
      label: 'Foto de perfil',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: {contains: 'image'}
      }
    },
    {
      name: 'profession',
      type: 'select',
      hasMany: false,
      required: true,
      options: [
        { label: 'Médico', value: 'medic'},
        { label: 'Psicólogo', value: 'psychologist'},
        { label: 'Abogado', value: 'lawyer'},
        { label: 'Periodista', value: 'journalist'},
        { label: 'Activista', value: 'activist'},
        { label: 'Administrador', value: 'admin'},
      ],
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
        read: isAdminFieldLevel,
      }
    },
    {
      name: 'roles',
      saveToJWT: true,
      type: 'select',
      hasMany: true,
      defaultValue: ['editor'],
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
    },
  ],
}

export default Users
