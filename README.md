# Mimock demo app

An app to demo how mimock can be used in real-time in CI pipelines

The use case involves running an automation test for a simple web app that returns the details of the starships from starwars

The github actions workflow spins up the mimock app and sets up the following mocks

- **Mock-1:** For `/search` endpoint which accepts the name of the ship and returns the details about the ship
  ```
  [POST] /search
  {
    "shipName": "x-wing"
  }
  ```

- **Mock-2:** A mock for the webp image that is displayed in the web page based on the image URL returned by the /search endpoint

## The flow of the test

Puppeteer is used to simulate the user journey of the app. The script is run in a headless browser.

**Stages**

- Navigate to the url of the app
- Enter the name of the ship in the search box
- Click on the search button
- Verify that the preview details of the ship are displayed
- Click on the preview to view the full details of the ship

Once the journey is complete, the script captures the screenshots of the web page and uploads as github actions artifacts

