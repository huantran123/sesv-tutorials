const fetchButton = document.getElementById('fetchButton');
const tutorialList = document.getElementById('tutorialList');

fetchButton.addEventListener('click', () => {
  const confirmed = window.confirm('Are you sure you want to fetch the tutorials?')
  if (confirmed) {
    fetchTutorials();
  }
});

function fetchTutorials() {
  fetch('http://localhost:3000/fetch-tutorials')
    .then(response => response.json())
    .then(data => {
      tutorialList.innerHTML = ''; // Clear previous content
      let counter = 1;
      // Sort the tutorials in published data order
      const sortedTutorials = data.sort((a, b) => new Date(b.node.frontmatter.date) - new Date(a.node.frontmatter.date))
      // Display the tutorials
      sortedTutorials.forEach(tutorial => renderTutorial(tutorial, counter++));
    })
    .catch(error => {
      console.error('Error:', error);
      tutorialList.innerHTML = '<li>Failed to fetch tutorials</li>';
    });
}

function renderTutorial(tutorial, counter) {
  // Create the <li> element
  const listItem = document.createElement('li');
  // Create the <div> element
  const container = document.createElement('div')
  container.className = 'tutorial-container'
  // Create the tutorial title element
  const title = document.createElement('h3')
  title.textContent = counter + '. ' + tutorial.node.frontmatter.title
  title.className = 'tutorial-title'
  // Create the published date element
  const publishedDate = document.createElement('p')
  publishedDate.textContent = new Date(tutorial.node.frontmatter.date).toLocaleDateString();
  publishedDate.className = 'tutorial-date'
  // Create the tutorial tags element
  const tags = document.createElement('p')
  tags.textContent = 'Tags: ' + tutorial.node.frontmatter.tags.join(', ')
  tags.className = 'tutorial-tags'
  // Create the link element
  const link = document.createElement('a')
  link.href = 'https://www.sesvtutorial.com' + tutorial.node.fields.slug
  link.textContent = 'View tutorial'
  link.className = 'tutorial-link'
  link.target = '_blank'
  // Append title, data, tags, and link elements to container element
  container.appendChild(title)
  container.appendChild(publishedDate)
  container.appendChild(tags)
  container.appendChild(link)
  // Append container element to list item
  listItem.appendChild(container)
  // Append list item to li list
  tutorialList.appendChild(listItem);
}