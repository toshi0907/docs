/**
 * 検索機能の実装
 * Jekyll サイト用のクライアントサイド検索
 */
class JekyllSearch {
  constructor() {
    this.searchData = [];
    this.searchInput = null;
    this.searchResults = null;
    this.isDataLoaded = false;
    
    this.init();
  }

  async init() {
    // 検索データの読み込み
    await this.loadSearchData();
    
    // DOM要素の初期化
    this.initElements();
    
    // イベントリスナーの設定
    this.bindEvents();
  }

  async loadSearchData() {
    try {
      const response = await fetch('/docs/search.json');
      const data = await response.json();
      this.searchData = data.docs;
      this.isDataLoaded = true;
      console.log('検索データを読み込みました:', this.searchData.length, '件');
    } catch (error) {
      console.error('検索データの読み込みに失敗しました:', error);
    }
  }

  initElements() {
    this.searchInput = document.getElementById('search-input');
    this.searchResults = document.getElementById('search-results');
    
    if (!this.searchInput || !this.searchResults) {
      console.warn('検索要素が見つかりません');
      return;
    }
  }

  bindEvents() {
    if (!this.searchInput) return;

    // リアルタイム検索
    this.searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      this.performSearch(query);
    });

    // エスケープキーで検索結果をクリア
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.clearSearch();
      }
    });

    // 検索結果外をクリックで結果を非表示
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#search-container')) {
        this.hideResults();
      }
    });
  }

  performSearch(query) {
    if (!this.isDataLoaded) {
      this.showLoading();
      return;
    }

    if (query.length < 2) {
      this.hideResults();
      return;
    }

    const results = this.search(query);
    this.displayResults(results, query);
  }

  search(query) {
    const lowercaseQuery = query.toLowerCase();
    const queryWords = lowercaseQuery.split(/\s+/).filter(word => word.length > 0);
    
    return this.searchData
      .map(doc => {
        let score = 0;
        
        // タイトルでの一致（高スコア）
        if (doc.title && doc.title.toLowerCase().includes(lowercaseQuery)) {
          score += 10;
        }
        
        // 各単語での部分一致
        queryWords.forEach(word => {
          const titleMatch = doc.title && doc.title.toLowerCase().includes(word);
          const contentMatch = doc.content && doc.content.toLowerCase().includes(word);
          
          if (titleMatch) score += 5;
          if (contentMatch) score += 1;
        });
        
        return { ...doc, score };
      })
      .filter(doc => doc.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // 上位10件まで
  }

  displayResults(results, query) {
    if (!this.searchResults) return;

    if (results.length === 0) {
      this.searchResults.innerHTML = `
        <div class="search-no-results">
          <p>「${this.escapeHtml(query)}」に関する結果が見つかりませんでした。</p>
        </div>
      `;
    } else {
      const resultsHtml = results.map(result => `
        <div class="search-result-item">
          <h3><a href="${result.url}">${this.highlightText(result.title, query)}</a></h3>
          <p class="search-result-excerpt">${this.highlightText(result.excerpt, query)}</p>
          <p class="search-result-url">${result.url}</p>
        </div>
      `).join('');

      this.searchResults.innerHTML = `
        <div class="search-results-header">
          <p>${results.length}件の結果が見つかりました</p>
        </div>
        ${resultsHtml}
      `;
    }

    this.showResults();
  }

  highlightText(text, query) {
    if (!text || !query) return text || '';
    
    const escapedText = this.escapeHtml(text);
    const queryWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 0);
    
    let highlightedText = escapedText;
    
    queryWords.forEach(word => {
      const regex = new RegExp(`(${this.escapeRegex(word)})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
    });
    
    return highlightedText;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  showResults() {
    if (this.searchResults) {
      this.searchResults.style.display = 'block';
    }
  }

  hideResults() {
    if (this.searchResults) {
      this.searchResults.style.display = 'none';
    }
  }

  showLoading() {
    if (this.searchResults) {
      this.searchResults.innerHTML = '<div class="search-loading">検索データを読み込み中...</div>';
      this.showResults();
    }
  }

  clearSearch() {
    if (this.searchInput) {
      this.searchInput.value = '';
    }
    this.hideResults();
  }
}

// DOM読み込み完了後に検索機能を初期化
document.addEventListener('DOMContentLoaded', () => {
  new JekyllSearch();
});