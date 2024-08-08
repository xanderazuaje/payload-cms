import {Access, FieldAccess} from "payload/types";
import {User} from "@/payload-types";

export const isAdmin: Access<any, User> = ({req: {user}}) => {
    return Boolean(user?.roles?.includes('admin'))
}
export const isAdminFieldLevel: FieldAccess<{ id: string }, unknown, User> = ({req: {user}}) => {
    return Boolean(user?.roles?.includes('admin'))
}
export const isAdminOrSelf: Access = ({req: {user}}) => {
    if (user) {
        if (user?.roles?.includes('admin')) {
            return true
        }
        return {
            id: {
                equals: user.id
            }
        }
    }
    return {
        roles: {
            not_equals: "admin"
        }
    }
}

export const userPublicState: Access = ({req: {user}}) => {
    if (user) {
        if (user?.roles?.includes('admin')) {
            return true
        }
        return {
            id: {
                equals: user.id
            }
        }
    }
    return false
}

export const postsPolicyEdit: Access = ({req: { user }}) => {
    if (user) {
        if (user.roles.includes('admin')) return true
        if (user.roles.includes('editor')) {
            return {
                author: {
                    equals: user.id
                }
            }
        }
    }
    return false
}


export const postsPolicyAccess: Access = ({req: { user }}) => {
    if (user) {
        if (user.roles.includes('admin')) return true
        if (user.roles.includes('editor')) {
            return {
                author: {
                    equals: user.id
                }
            }
        }
    }
    return {
        _status: {
            equals: 'published'
        }
    }
}