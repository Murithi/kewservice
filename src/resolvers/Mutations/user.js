import bcrypt from 'bcrypt'
import _ from 'lodash'
import { tryLogin } from '../../auth'

const formatErrors = (e, models) => {
	if (e instanceof models.sequelize.ValidationError) {
		//  _.pick({a: 1, b: 2}, 'a') => {a: 1}
		return e.errors.map(x => _.pick(x, ['path', 'message']))
	}
	return [{ path: 'name', message: 'something went wrong' }]
}

const User = {
	login: (_, { email, password }, { models, SECRET }, info) =>
		tryLogin(email, password, models, SECRET),

	signup: async (_, { password, idNumber, ...otherArgs }, { models }, info) => {
		try {
			if (password.length < 5 || password.length > 100) {
				return {
					ok: false,
					errors: [
						{
							path: 'password',
							message:
								'The password needs to be between 5 and 100 characters long',
						},
					],
				}
			}

			const hashedPassword = await bcrypt.hash(password, 12)

			let personnel = await models.Personnel.findOne({ where: { idNumber } })
			console.log(personnel)
			const user = await models.User.create({
				...otherArgs,
				password: hashedPassword,
				personnelId: personnel.id,
			})

			return {
				ok: true,
				errors: formatErrors(err, models),
			}
		} catch (err) {
			return {
				ok: true,
			}
		}
	},

	updateUserRole: async (_, args, ctx, info) => {
		let { id, role, authorized, locked } = args
		role = role.replace(/^"(.*)"$/, '$1')
		// ctx.models.RequestService.findOne({where:{requestservice_id}})
		const request = await ctx.models.User.findOne({ where: { id } })

		await request.update({ userRole: role, authorized, locked })

		return request
	},
}

module.exports = { User }
