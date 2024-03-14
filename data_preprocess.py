import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

if 1:
    print("Loading data...")
    data = pd.read_csv('hpv_past_results.csv')
    data['income_group'] = data['income_group'].str.replace('income', '').str.strip()
    print(data.head())

    data_2020 = data[data['year'] == 2020]
    print(data_2020.head())
    coverage_data_2020 = data_2020.groupby('income_group')['coverage'].mean()
    coverage_data_2020 = coverage_data_2020.reset_index()
    coverage_data_2020 = coverage_data_2020.sort_values(by='coverage', ascending=False)
    print(coverage_data_2020)

    # Create the bar plot using seaborn
    ax = sns.barplot(data=coverage_data_2020, x='income_group', y='coverage', color='#03989f')

    # Set the labels and title of the plot
    plt.xlabel('Income Group')
    plt.ylabel('Mean HPV Vaccine Coverage')
    plt.title('Mean HPV Vaccine Coverage by Income Group in 2020')
    ax.bar_label(ax.containers[0])

    # Display the plot
    plt.show()

    cases_data = data.groupby(['year', 'income_group'])['possible_cancer_cases'].mean().reset_index()
    print(cases_data)

    # Create the line plot using seaborn
    sns.lineplot(data=cases_data, x='year', y='possible_cancer_cases', hue='income_group')

    # Set the labels and title of the plot
    plt.xlabel('Year')
    plt.ylabel('Mean Possible Cases')
    plt.title('Mean Possible Cases by Income Group over time')

    # Display the plot
    plt.show()

    deaths_data = data.groupby(['year', 'income_group'])['possible_cancer_deaths'].mean().reset_index()
    print(deaths_data)

    # Create the line plot using seaborn
    sns.lineplot(data=deaths_data, x='year', y='possible_cancer_deaths', hue='income_group')

    # Set the labels and title of the plot
    plt.xlabel('Year')
    plt.ylabel('Mean Possible Deaths')
    plt.title('Mean Possible Deaths by Income Group over time')
    plt.show()

    # Filter the data for the years 2010 and 2021
    cases_endpoints = cases_data[(cases_data['year'] == 2010) | (cases_data['year'] == 2021)]

    # Pivot the filtered data
    pivot_table_cases = cases_endpoints.pivot_table(index='income_group', columns='year', values='possible_cancer_cases')

    # Calculate the average rate of change for each income group
    average_rate_of_change_cases = (pivot_table_cases[2021] - pivot_table_cases[2010]) / (2021 - 2010)

    # Print the average rate of change for each income group
    print("\nAverage Rate of Change for Possible Cases by", average_rate_of_change_cases)

    # Filter the data for the years 2010 and 2021
    deaths_endpoints = deaths_data[(deaths_data['year'] == 2010) | (deaths_data['year'] == 2021)]

    # Pivot the filtered data
    pivot_table_deaths = deaths_endpoints.pivot_table(index='income_group', columns='year', values='possible_cancer_deaths')

    # Calculate the average rate of change for each income group
    average_rate_of_change_deaths = (pivot_table_deaths[2021] - pivot_table_deaths[2010]) / (2021 - 2010)

    # Print the average rate of change for each income group
    print("\nAverage Rate of Change for Possible Deaths by", average_rate_of_change_deaths)

