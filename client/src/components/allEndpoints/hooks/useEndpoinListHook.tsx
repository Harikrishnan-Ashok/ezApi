import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function useEndpoinListHook() {
	const {entity} = useParams()
	const [listOfEndpoints, setListOfEndpoints] = useState([])
	const [guestMode, setGuestMode] = useState(false)

	useEffect(() => {
		if (entity === "guest") {
			setListOfEndpoints([]);
			setGuestMode(true);
		} else {
			setGuestMode(false);
			//fetching the data here for a non guest
		}
	}, [entity]);

	return {listOfEndpoints, guestMode}
}
