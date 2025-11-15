// assets/js/app.js
// Simple router + renderer
const app = document.getElementById('app');

// Utility: get item from localStorage or default
function ls(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch(e){ return fallback; }
}
function setLs(key,val){ localStorage.setItem(key, JSON.stringify(val)); }

// Render helpers
function formatDate(d){ return new Date(d).toLocaleDateString(); }

function homeView(){
  return `
    <section class="hero">
      <div>
        <h1>Welcome to Namma Kudla</h1>
        <p class="lead">Share experiences, find guides, and explore hidden gems of Kudla.</p>
        <div><a href="#/posts" class="btn">Explore Posts</a></div>
      </div>
      <aside>
        <h3>Featured</h3>
        ${POSTS.slice(0,2).map(p=>`<div class="card"><img src="${p.thumbnail}" alt=""><h4>${p.title}</h4><p class="meta">${p.author} • ${formatDate(p.date)}</p></div>`).join('')}
      </aside>
    </section>

    <h2>Recent Posts</h2>
    <div class="grid cols-2">
      ${POSTS.map(p=>postCard(p)).join('')}
    </div>
  `;
}

function postCard(p){
  return `<article class="card">
    <a href="#/post/${p.id}"><img src="${p.thumbnail}" alt=""></a>
    <h3 class="post-title"><a href="#/post/${p.id}">${p.title}</a></h3>
    <p class="meta">${p.author} • ${formatDate(p.date)} • ${p.category}</p>
  </article>`;
}

function postsListView(){
  return `
    <h1>Blog</h1>
    <div style="margin-bottom:0.5rem">
      <input id="search" placeholder="Search posts..." />
      <select id="filter-cat"><option value="">All categories</option>${[...new Set(POSTS.map(p=>p.category))].map(c=>`<option>${c}</option>`).join('')}</select>
    </div>
    <div id="posts-grid" class="grid cols-3">${POSTS.map(p=>postCard(p)).join('')}</div>
  `;
}

function postView(id){
  const p = POSTS.find(x=>x.id===id);
  if(!p) return `<h2>Post not found</h2>`;
  const comments = ls('comments', {})[id] || [];
  return `
    <article>
      <h1>${p.title}</h1>
      <p class="meta">${p.author} • ${formatDate(p.date)} • ${p.category}</p>
      <img src="${p.thumbnail}" alt="" style="max-width:100%; border-radius:8px; margin-top:1rem"/>
      <div class="post-content">${p.content}</div>

      <section class="comments">
        <h3>Comments (${comments.length})</h3>
        <div id="comment-list">${comments.map(c=>`<div class="comment"><strong>${c.name}</strong><div>${c.text}</div></div>`).join('')}</div>

        <h4>Leave a comment</h4>
        <form id="comment-form">
          <input required name="name" placeholder="Your name"/><br/>
          <textarea required name="text" placeholder="Write your comment"></textarea><br/>
          <button type="submit">Post Comment</button>
        </form>
      </section>
    </article>
  `;
}

function destinationsView(){
  return `
    <h1>Destinations</h1>
    <div class="grid cols-3">
      ${DESTINATIONS.map(d=>`<div class="card"><img src="${d.images[0]}" alt=""><h3><a href="#/dest/${d.id}">${d.name}</a></h3><p>${d.description.slice(0,80)}…</p></div>`).join('')}
    </div>
  `;
}

function destView(id){
  const d = DESTINATIONS.find(x=>x.id===id);
  if(!d) return `<h2>Destination not found</h2>`;
  return `<h1>${d.name}</h1><p>${d.description}</p>
    ${d.mapEmbed ? `<div class="map">${d.mapEmbed}</div>` : ``}
  `;
}

function guidesView(){
  return `<h1>Guides</h1><div class="grid cols-2">${GUIDES.map(g=>`<div class="card"><img src="${g.avatar}" alt=""><h3><a href="#/guide/${g.id}">${g.name}</a></h3><p>${g.bio}</p></div>`).join('')}</div>`;
}

function guideView(id){
  const g = GUIDES.find(x=>x.id===id);
  if(!g) return `<h2>Guide not found</h2>`;
  return `<h1>${g.name}</h1><p>${g.bio}</p><p>Expertise: ${g.expertise.join(', ')}</p>
    <h3>Posts</h3><div class="grid">${g.posts.map(pid=>{ const p=POSTS.find(x=>x.id===pid); return p?postCard(p):'' }).join('')}</div>
  `;
}

/* Router */
function router(){
  const hash = location.hash || '#/';
  const [path, id] = hash.slice(2).split('/');
  let html = '';
  if(hash === '#/' || hash === '') html = homeView();
  else if (hash.startsWith('#/posts')) html = postsListView();
  else if (hash.startsWith('#/post/')) html = postView(hash.split('/')[2]);
  else if (hash.startsWith('#/destinations') || hash === '#/destinations') html=destinationsView();
  else if (hash.startsWith('#/dest/')) html = destView(hash.split('/')[2]);
  else if (hash.startsWith('#/guides')) html = guidesView();
  else if (hash.startsWith('#/guide/')) html = guideView(hash.split('/')[2]);
  else html = `<h2>Page not found</h2>`;
  app.innerHTML = html;

  // Attach handlers after render
  if(document.getElementById('comment-form')){
    document.getElementById('comment-form').addEventListener('submit', function(e){
      e.preventDefault();
      const name = this.name.value.trim(), text = this.text.value.trim();
      if(!name||!text) return;
      const comments = ls('comments', {});
      comments[hash.split('/')[2]] = comments[hash.split('/')[2]] || [];
      comments[hash.split('/')[2]].push({name,text,ts:Date.now()});
      setLs('comments', comments);
      router(); // re-render
    });
  }

  if(document.getElementById('search')){
    const search = document.getElementById('search');
    const filter = document.getElementById('filter-cat');
    function applyFilter(){
      const q = search.value.toLowerCase();
      const cat = filter.value;
      const filtered = POSTS.filter(p=>{
        const inQ = p.title.toLowerCase().includes(q) || p.tags.join(' ').includes(q);
        const inCat = !cat || p.category === cat;
        return inQ && inCat;
      });
      document.getElementById('posts-grid').innerHTML = filtered.map(postCard).join('');
    }
    search.addEventListener('input', applyFilter);
    filter.addEventListener('change', applyFilter);
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
