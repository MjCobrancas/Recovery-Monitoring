import { NextRequest, NextResponse } from "next/server";
import { parseJWT } from "./utils/ParseJWT";
import { ITokenUserValues } from "./interfaces/Generics";
import { secondRoutes, actionRoutes } from "@/api/routes"
import { ActionRoutes, SecondRoutes } from "./interfaces/IRoutes";

export function middleware(request: NextRequest) {
	const token = request.cookies.get('user')?.value

	let validRoute = false
	const { pathname } = request.nextUrl

	if (!token) {
		return NextResponse.redirect(`${process.env.FRONTEND_DOMAIN}/login`)
	}

	const tokenUserValues: ITokenUserValues | null = parseJWT(token)

	if (tokenUserValues == null) {
		return NextResponse.redirect(`${process.env.FRONTEND_DOMAIN}/login`)
	}

	const validRoutes: Array<SecondRoutes> = secondRoutes.filter((e) => {
		return e.permissions.some((e: number) => {
			return e == Number(tokenUserValues.permission)
		})
	})

	validRoutes.map((item: SecondRoutes) => {
		if (item.route == pathname) {
			validRoute = true
		}
	})

	if (!validRoute) {
		const validActionRoutes: Array<ActionRoutes> = actionRoutes.filter((e) => {
			return e.permissions.some((e: number) => {
				return e == Number(tokenUserValues.permission)
			})
		})

		validActionRoutes.map((item: ActionRoutes) => {
			if (item.route == pathname) {
				validRoute = true
			}
		})

		if (!validRoute) {
			return NextResponse.redirect(`${process.env.FRONTEND_DOMAIN}/login`)
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/', '/monitoring', '/monitoring/:path*']
}