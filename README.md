# ECS 163: Information Interfaces Final Project

To view the web page, please open the `index.html` file with the Live Server extension in Visual Studio Code. All dependencies, including images, are located in the parent directory.

---

### File Structure

- `index.html` contains the structure of the web page, including static images, tables, and text.
- `main.js` contains the Javascript code that generates the interactive choropleth map.
- `styles.css` contains the design of the website, including the layout, visual effects and background color.
- `world.geojson` is the JSON file that contains the `geometry` data for each country in the world.
- `output.geojson` is the JSON file used by `main.js` that appends additional properties from the Cervical Cancer data set (i.e. coverage, income group, etc.).
- `hpv_past_results.csv` is the Cervical Cancer data set sourced from [Kaggle](https://www.kaggle.com/datasets/willianoliveiragibin/cervical-cancer-vaccines/data).
- `data_preprocess.py` contains the Python code that transforms the data, generates the two static visualizations using the Seaborn library, and creates `output.geojson` using `world.geojson` with the Geopandas library.
- `cc_death_rate.png` is a visualization created in Google Slides.
- `coverage_by_income.png` is a Seaborn bar plot showing the average HPV vaccine coverage amongst country income groups.
- `possible_cases_over_time.png` is a Seaborn line plot showing the average possible cervical cancer cases over time from 2010 to 2020 by country income groups.
- `possible_deaths_over_time.png` is a Seaborn line plot showing the average possible cervical cancer deaths over time from 2010 to 2020 by country income groups.
- The remaining files are `###_icon.png` used as icons to visually denote each country's income group in the interactive choropleth map.

---
