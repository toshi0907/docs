---
layout: page
title: "検索"
permalink: /search/
---

<div id="search-container">
  <input type="text" id="search-input" placeholder="ドキュメントを検索..." style="width: 100%; padding: 10px; font-size: 16px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 4px;">
  <div id="search-results-info" style="margin-bottom: 10px; color: #666;"></div>
  <ul id="results-container"></ul>
</div>

<script>
class SimpleSearch {
  constructor(options) {
    this.searchInput = options.searchInput;
    this.resultsContainer = options.resultsContainer;
    this.searchData = [];
    this.noResultsText = options.noResultsText || 'No results found';
    this.limit = options.limit || 10;
    
    this.loadSearchData(options.dataUrl);
    this.bindEvents();
  }
  
  async loadSearchData(url) {
    try {
      const response = await fetch(url);
      this.searchData = await response.json();
    } catch (error) {
      console.error('Failed to load search data:', error);
    }
  }
  
  bindEvents() {
    this.searchInput.addEventListener('input', (e) => {
      this.performSearch(e.target.value);
    });
  }
  
  performSearch(query) {
    const resultsInfo = document.getElementById('search-results-info');
    
    if (!query.trim()) {
      this.resultsContainer.innerHTML = '';
      resultsInfo.textContent = '';
      return;
    }
    
    const results = this.searchData.filter(item => {
      const searchText = (item.title + ' ' + item.content).toLowerCase();
      return searchText.includes(query.toLowerCase());
    }).slice(0, this.limit);
    
    resultsInfo.textContent = `${results.length}件の検索結果が見つかりました`;
    
    if (results.length === 0) {
      this.resultsContainer.innerHTML = `<li style="padding: 20px; text-align: center; color: #666;">${this.noResultsText}</li>`;
      return;
    }
    
    this.resultsContainer.innerHTML = results.map(result => {
      const snippet = this.createSnippet(result.content, query);
      return `<li><a href="${result.url}">${result.title}</a><br><small>${snippet}</small></li>`;
    }).join('');
  }
  
  createSnippet(content, query) {
    const maxLength = 150;
    const lowerContent = content.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerContent.indexOf(lowerQuery);
    
    if (index === -1) {
      return content.slice(0, maxLength) + (content.length > maxLength ? '...' : '');
    }
    
    const start = Math.max(0, index - 50);
    const end = Math.min(content.length, start + maxLength);
    let snippet = content.slice(start, end);
    
    if (start > 0) snippet = '...' + snippet;
    if (end < content.length) snippet = snippet + '...';
    
    // Highlight the search term
    const regex = new RegExp(`(${query})`, 'gi');
    snippet = snippet.replace(regex, '<mark>$1</mark>');
    
    return snippet;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('results-container');
  
  if (searchInput && resultsContainer) {
    const search = new SimpleSearch({
      searchInput: searchInput,
      resultsContainer: resultsContainer,
      dataUrl: '{{ site.baseurl }}/search.json',
      noResultsText: '検索結果が見つかりませんでした。',
      limit: 10
    });
    
    // Handle URL parameters for direct search
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      searchInput.value = decodeURIComponent(query);
      search.performSearch(searchInput.value);
    }
  }
});
</script>

<style>
#search-container {
  max-width: 600px;
  margin: 0 auto;
}

#results-container {
  list-style: none;
  padding: 0;
}

#results-container li {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #f9f9f9;
}

#results-container li a {
  font-weight: bold;
  color: #2a7ae4;
  text-decoration: none;
}

#results-container li a:hover {
  text-decoration: underline;
}

#results-container li small {
  color: #666;
  line-height: 1.4;
  display: block;
  margin-top: 5px;
  max-height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
}

mark {
  background-color: #ffeb3b;
  padding: 1px 2px;
  border-radius: 2px;
}
</style>