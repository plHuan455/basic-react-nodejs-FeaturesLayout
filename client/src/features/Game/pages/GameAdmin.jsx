import React, {useEffect} from "react";
import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";

import GameList from "./GameList";
import NotFound from "components/NotFound";
import {adminGet} from "../gameSlice";
import {useDispatch} from "react-redux";

function GameAdmin(props) {
	const dispatch = useDispatch();

	const match = useRouteMatch();

	useEffect(() => {
		const fetchGameList = async () => {
			try {
				const response = await dispatch(adminGet());
				console.log(response);
			} catch (err) {
				console.log(err);
			}
		};
		fetchGameList();
	}, []);
	return (
		<Switch>
			<Route path={`${match.url}/table`} component={GameList} />
			<Route path={match.url}>
				<Redirect to={`${match.url}/table`} />
			</Route>
			<Route component={NotFound}></Route>
		</Switch>
	);
}

export default GameAdmin;
