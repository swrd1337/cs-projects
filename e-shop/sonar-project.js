const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "http://localhost:9000",
    token: "a84ab492db7418a6151735003009cc440c94bae8",
    options: {
	"sonar.projectName": "e-shop-client",
      "sonar.sources": "./src/main/js",
      "sonar.exclusions": "**/__tests__/**"
    },
  },
  () => {},
);