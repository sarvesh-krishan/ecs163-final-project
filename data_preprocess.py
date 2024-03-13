import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

if 1:
    print("Loading data...")
    data = pd.read_csv('hpv_past_results.csv')
    print(data.head())

    data_2020 = data[data['year'] == 2020]
    print(data_2020.head())
    coverage_data_2020 = data_2020.groupby('income_group')['coverage'].mean()
    coverage_data_2020 = coverage_data_2020.reset_index()
    coverage_data_2020 = coverage_data_2020.sort_values(by='coverage', ascending=False)
    print(coverage_data_2020)

    # Create the bar plot using seaborn
    sns.barplot(data=coverage_data_2020, x='income_group', y='coverage', color='#03989f')

    # Set the labels and title of the plot
    plt.xlabel('Income Group')
    plt.ylabel('Mean HPV Vaccine Coverage')
    plt.title('Mean HPV Vaccine Coverage by Income Group in 2020')

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

