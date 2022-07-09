A Simple one page news App

![](CodingTest.gif)

For this app, I used React, React Hooks, React Query and some other libraries.
I used the free [News API](https://newsapi.org/) to get the news.

Breakdown of the code:
In Body.jsx (the main component):
I set a default search term to "Bitcoin"
I set a default page to 1
The api allows for sortBy popularity, relevancy and publishedAt
However, I observed popularity and relevancy are the same.
I set a default sortBy to an empty string.
Then I use the useQuery hook to get the news,
passing in searchTerm and sortBy as the data name and the page as the query key.
After data is fetched, I used the useEffect hook to handle the grouping by date and
converting into an array.
The groupData function returns an object
The convertGroupData function then converts the array into an array of objects with the date and the news.
Then the result of convertGroupData is stored in a group state
In the jsx, I have the Search and Filter components as well as map out the items in the group state.
To map out the group state, I first conditionally check if isLoading (a prop from React Query) is true.
If isLoading is true, I render a loading spinner.
If isLoading is false, I conditionally check for the error (a prop from React Query)
If there is an error, I render an error message.
Else, I render the news.
I am mapping out the entire page fetched from the api.
I also included a Prev and Next button to navigate through the pages.
The Filter component is used to filter the news by the category.
The Search component is used to search for news. The search term is stored in the state.

NB: I initially wanted to host the app on Netlify, but the News API Developer Plan is limited to development only.
To test this work, kindly clone the repo and test locally.
Below is a list of apiKeys you can use to test the app:

1. 3775d0dcc02e420aae630ae761863436
2. aef0fb1b65764bd0b638827a204fb60f
3. d2c6d40321134c6e9093a72d0bf87631

Also, the maximum number of news items that can be fetched per page is 100.
This was why I included the Prev and Next buttons.
