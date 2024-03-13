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
