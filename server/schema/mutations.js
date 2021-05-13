const graphql =  require('graphql')
const AuthService = require('../services/auth')

const { 
    GraphQLObjectType,
    GraphQLString
} =  graphql

const UserType = require('./types/user_type')

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: UserType,
            args: {
                email: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                }
            },
            resolve(parentValue, {email, password}, req) {
                return AuthService.signup({email, password, req})
            }

        },
        logout: {
            type: UserType,
            resolve(parentValue, args, req) {
                const {user} = req
                req.logout()
                return user
            }
        }
    }
})

module.exports = mutation