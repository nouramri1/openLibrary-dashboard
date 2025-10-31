# Web Development Project 5 - *OpenLibrary Books Dashboard*

Submitted by: **Noura Amri**

This web app fetches book data from the OpenLibrary API and displays a data dashboard where users can explore books by subject, search by title, and filter by publication year. The dashboard also includes summary statistics that help users learn insights about trends in book publishing.

Time spent: **2.5** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard displays at least 10 unique items, one per row
  - Each row displays title, author, publish year, and book cover
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data** 
  - Total number of books fetched
  - Earliest publish year
  - Latest publish year
  - Average publish year
  - Most frequent author in the dataset (mode)
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar correctly filters items live as user types
  - Only books matching the search term are displayed
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - User can filter by publication year range (e.g., 2000+, 2010+)
  - User can filter by genre/subject (fantasy, romance, mystery, science, history)
  - Results update dynamically

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types (text input + dropdown menus)

The following **additional** features are implemented:

- [x] Clean UI with custom CSS
- [x] Book cover images displayed
- [x] External link to OpenLibrary book page
- [x] Live count of displayed results

## Video Walkthrough

Here's a walkthrough vid:

(https://i.imgur.com/yG9KOfc.gif)


GIF created with Kap

## Notes

Challenges included properly working with the OpenLibrary API and handling objects that did not have full metadata (missing authors or publish years).

## License

    Copyright 2025 Noura Amri

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
