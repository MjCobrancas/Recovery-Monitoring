import { NextRequest, NextResponse } from "next/server";
import { parseJWT } from "./utils/ParseJWT";
import { ITokenUserValues } from "./interfaces/Generics";
import { secondRoutes, actionRoutes } from "@/api/routes"
import { ActionRoutes, SecondRoutes } from "./interfaces/IRoutes";
import { verifyUserToken } from "./api/generics/verifyToken";

export async function middleware(request: NextRequest) {
	const token = request.cookies.get('user')?.value

	let validRoute = false
	const { pathname } = request.nextUrl

	if (pathname == "/login") {
		const isValidToken = await verifyUserToken()

		if (!isValidToken) {
			return
		}

		return NextResponse.redirect(`${process.env.FRONTEND_DOMAIN}/`)
	}

	if (!token) {
		return NextResponse.redirect(`${process.env.FRONTEND_DOMAIN}/login`)
	}

	const isValidToken = await verifyUserToken()

	if (!isValidToken) {
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
		const pathNameWithRegex = pathname.match(/\/[\w-]+(\/[\w-]+)*/g)
		const pathNameWithRegex2 = pathNameWithRegex != null ? pathNameWithRegex.join('') : ""
		const pathNameWithRegex3 = pathname.match(/\/[\w-]+\/[\w-]+/g)
		const pathNameWithRegex4 = pathNameWithRegex3 != null ? pathNameWithRegex3.join('') : ""

		const validActionRoutes: Array<ActionRoutes> = actionRoutes.filter((e) => {
			return e.permissions.some((e: number) => {
				return e == Number(tokenUserValues.permission)
			})
		})

		validActionRoutes.map((item: ActionRoutes) => {
			if (item.route == pathNameWithRegex2 || item.route == pathNameWithRegex4) {
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
	matcher: ['/', '/login', '/monitoring', '/monitoring/:path*', '/change-password']
}