<div id="login-form">
	<form action="index.php" method="POST">
		<input type="hidden" name="action" value="login">
		<h2>Please login!</h2>
		<div class="username">
			<label>Username: </label><input type="text" name="name" size="30" placeholder="Your username...">
		</div>
		<div class="password">
			<label>Password: </label><input type="password" name="password" size="30" placeholder="Your password...">
		</div>
		<div class="btn-container">
			<input class="submit-button" type="submit" value="Login" />
		</div>
	</form>
	<a href="./register.php">Create new account...</a>
</div>