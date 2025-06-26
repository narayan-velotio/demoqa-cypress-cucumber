.PHONY: install test test-chrome test-firefox clean report

install:
	npm install

clean:
	rm -rf cypress/reports
	rm -rf cypress/screenshots
	rm -rf cypress/videos

test:
	npx cypress run

test-chrome:
	npx cypress run --browser chrome

test-firefox:
	npx cypress run --browser firefox

report:
	npx cypress run --reporter mochawesome

all: clean install test report 