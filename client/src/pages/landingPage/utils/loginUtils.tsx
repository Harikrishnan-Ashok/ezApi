import {NavigateFunction} from "react-router-dom"

export const handleGuestLogin = (navigate: NavigateFunction) => {
	console.log("navigating to guestLogin")
	navigate("/home/guest/all_endpoints")
}

export const handleUserLogin = (navigate: NavigateFunction) => {
	console.log("navigating to user LoginPage")
	navigate("/login")
}

export const handleUserSignUp = (navigate: NavigateFunction) => {
	console.log("navigating to user LoginPage")
	navigate("/signup")
}
