class ScoreboardHelper {
	static async get_scoreboard() {
		try {
			const response = await fetch(game.config.scoreboard_get_url + "json");
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const json = await response.json();
			console.log(json);
			return json;
		} catch (error) {
			console.error(error.message);
			return null;
		}
	}

	static async submit_score(name, score) {
		try {
			const response = await fetch(game.config.scoreboard_submit_url + "add/" + name + "/" + score);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const text = await response.text();
			console.log(text);
			return true;
		} catch (error) {
			console.error(error.message);
			return false;
		}
	}

	static async name_entry_and_submit_score() {
		var player_name = prompt("Enter your name", "");
		if (!player_name) {
			alert("Enter a name");
			return;
		}

		var spinner = Utils.create_spinner();
		var success = await ScoreboardHelper.submit_score(player_name, GLOBAL_SCORE);
		spinner.visible = false;
		if (success) {
			GLOBAL_SCORE = 0;
			game.state.start("leaderboard");
		} else {
			console.error("Failed to submit score");
		}
	}

}