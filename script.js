// ===== GLOBAL STATE =====
let currentUser = null;
let allTerms = [];
let deleteTargetId = null;
let dataTable = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  loadAuth();
  setupAuthForms();
  setupLogout();

  if (location.pathname.includes('dashboard')) {
    protectDashboard();
    initDashboard();
  }

});

// ===== STORAGE =====
function initStorage() {
  if (!localStorage.users) {
     const defaultUsers = [
      { id: 1, name: 'Irene', email: 'irene@admin.com', password: 'admin123', role: 'admin' }
    ];

    localStorage.users = JSON.stringify(defaultUsers);
  }

   if (!localStorage.terms) {
    const terms = [
    {id:1, term:"API", desc:"Interface allowing two systems to communicate.", category:"Programming Concepts", example:"Apps call a payment API to complete transactions.", complexity:"Beginner"},
    {id:2, term:"Algorithm", desc:"Step-by-step procedure to solve a problem.", category:"Computer Science", example:"Sorting a list of numbers.", complexity:"Intermediate"},
    {id:3, term:"Array", desc:"Collection of elements stored in contiguous memory.", category:"Data Structure", example:"[1,2,3,4]", complexity:"Beginner"},
    {id:4, term:"Big O Notation", desc:"Notation to describe algorithm efficiency.", category:"Computer Science", example:"O(n) for linear search", complexity:"Advanced"},
    {id:5, term:"Binary Search", desc:"Efficient search algorithm for sorted arrays.", category:"Algorithm", example:"Finding 7 in [1,3,5,7,9]", complexity:"Intermediate"},
    {id:6, term:"Boolean", desc:"Data type with true/false values.", category:"Programming Concepts", example:"let isActive = true;", complexity:"Beginner"},
    {id:7, term:"Blockchain", desc:"Decentralized ledger of transactions.", category:"Technology", example:"Bitcoin uses blockchain", complexity:"Advanced"},
    {id:8, term:"Cache", desc:"Temporary storage for faster data access.", category:"Computer Systems", example:"Browser caching images", complexity:"Intermediate"},
    {id:9, term:"Class", desc:"Blueprint for creating objects in OOP.", category:"Programming Concepts", example:"class Car { constructor(make) { this.make = make; } }", complexity:"Intermediate"},
    {id:10, term:"Cloud Computing", desc:"Delivery of computing services over the internet.", category:"Technology", example:"AWS, Google Cloud", complexity:"Intermediate"},
    {id:11, term:"Command Line Interface", desc:"Text-based interface to interact with computers.", category:"Computer Systems", example:"Using terminal to navigate folders.", complexity:"Beginner"},
    {id:12, term:"Compiler", desc:"Program that converts source code into executable code.", category:"Programming Concepts", example:"GCC compiles C programs", complexity:"Intermediate"},
    {id:13, term:"CSS", desc:"Cascading Style Sheets for web page styling.", category:"Web Development", example:"body { background-color: blue; }", complexity:"Beginner"},
    {id:14, term:"Data Structure", desc:"A way to store and organize data efficiently.", category:"Computer Science", example:"Arrays, Linked Lists, Trees", complexity:"Intermediate"},
    {id:15, term:"Database", desc:"Organized collection of data.", category:"Data Management", example:"MySQL stores user data.", complexity:"Intermediate"},
    {id:16, term:"Debugging", desc:"Process of identifying and fixing errors in code.", category:"Programming Concepts", example:"Using breakpoints to find issues.", complexity:"Intermediate"},
    {id:17, term:"DNS", desc:"Domain Name System translates domain names to IP addresses.", category:"Networking", example:"www.google.com → 142.250.190.14", complexity:"Intermediate"},
    {id:18, term:"Encapsulation", desc:"OOP principle restricting access to internal object data.", category:"Programming Concepts", example:"Private variables in a class.", complexity:"Intermediate"},
    {id:19, term:"Encryption", desc:"Converting data into a secure format.", category:"Security", example:"HTTPS uses encryption.", complexity:"Advanced"},
    {id:20, term:"Framework", desc:"Reusable set of libraries and tools for software development.", category:"Programming Concepts", example:"React.js is a frontend framework.", complexity:"Intermediate"},
    {id:21, term:"Function", desc:"Reusable block of code performing a task.", category:"Programming Concepts", example:"function add(a,b){ return a+b; }", complexity:"Beginner"},
    {id:22, term:"Git", desc:"Version control system for tracking changes.", category:"Development Tools", example:"git commit -m 'update'", complexity:"Intermediate"},
    {id:23, term:"HTML", desc:"Hypertext Markup Language for web page structure.", category:"Web Development", example:"<h1>Hello World</h1>", complexity:"Beginner"},
    {id:24, term:"HTTP", desc:"Protocol for web communication.", category:"Networking", example:"Accessing web pages via browser.", complexity:"Intermediate"},
    {id:25, term:"HTTPS", desc:"Secure version of HTTP using encryption.", category:"Networking", example:"https://example.com", complexity:"Intermediate"},
    {id:26, term:"Inheritance", desc:"OOP principle where one class derives from another.", category:"Programming Concepts", example:"class Car extends Vehicle {}", complexity:"Intermediate"},
    {id:27, term:"Interface", desc:"Defines methods a class must implement.", category:"Programming Concepts", example:"interface Drawable { draw(); }", complexity:"Intermediate"},
    {id:28, term:"IP Address", desc:"Unique identifier for devices on a network.", category:"Networking", example:"192.168.0.1", complexity:"Intermediate"},
    {id:29, term:"Iteration", desc:"Repeating a set of instructions.", category:"Programming Concepts", example:"for loop iterating over an array.", complexity:"Beginner"},
    {id:30, term:"JavaScript", desc:"Programming language for web interactivity.", category:"Web Development", example:"document.getElementById('id')", complexity:"Beginner"},
    {id:31, term:"JSON", desc:"Data format for storing and exchanging data.", category:"Data Format", example:"{ 'name': 'Irene', 'age': 21 }", complexity:"Beginner"},
    {id:32, term:"Lambda", desc:"Anonymous function in programming.", category:"Programming Concepts", example:"x => x * 2", complexity:"Intermediate"},
    {id:33, term:"Linked List", desc:"Data structure with nodes pointing to the next.", category:"Data Structure", example:"1 → 2 → 3 → null", complexity:"Intermediate"},
    {id:34, term:"Loop", desc:"Code construct to repeat instructions.", category:"Programming Concepts", example:"for, while loops", complexity:"Beginner"},
    {id:35, term:"Machine Learning", desc:"Algorithmic systems that learn from data.", category:"Artificial Intelligence", example:"Predicting stock prices.", complexity:"Advanced"},
    {id:36, term:"Memory", desc:"Storage used to hold data temporarily or permanently.", category:"Computer Systems", example:"RAM and ROM", complexity:"Intermediate"},
    {id:37, term:"Method", desc:"Function inside a class in OOP.", category:"Programming Concepts", example:"car.start()", complexity:"Beginner"},
    {id:38, term:"Middleware", desc:"Software that connects applications or services.", category:"Programming Concepts", example:"Express.js middleware for handling requests", complexity:"Intermediate"},
    {id:39, term:"Module", desc:"Reusable piece of code.", category:"Programming Concepts", example:"Node.js modules like fs, http", complexity:"Intermediate"},
    {id:40, term:"Null", desc:"Represents absence of value.", category:"Programming Concepts", example:"let a = null;", complexity:"Beginner"},
    {id:41, term:"Object", desc:"Collection of properties and methods in OOP.", category:"Programming Concepts", example:"let car = { make: 'Toyota', drive(){ } }", complexity:"Beginner"},
    {id:42, term:"OOP", desc:"Object-Oriented Programming paradigm using objects and classes.", category:"Programming Concepts", example:"Java, C++", complexity:"Intermediate"},
    {id:43, term:"Operator", desc:"Symbol performing operations on variables or values.", category:"Programming Concepts", example:"+ , - , * , /", complexity:"Beginner"},
    {id:44, term:"Package", desc:"Collection of modules or libraries.", category:"Programming Concepts", example:"npm package lodash", complexity:"Intermediate"},
    {id:45, term:"Parameter", desc:"Variable passed to a function.", category:"Programming Concepts", example:"function add(a, b)", complexity:"Beginner"},
    {id:46, term:"Pointer", desc:"Variable storing memory address of another variable.", category:"Programming Concepts", example:"int *p = &x;", complexity:"Advanced"},
    {id:47, term:"Polymorphism", desc:"OOP principle allowing objects to take many forms.", category:"Programming Concepts", example:"Method overriding", complexity:"Advanced"},
    {id:48, term:"Python", desc:"High-level programming language.", category:"Programming Concepts", example:"print('Hello')", complexity:"Beginner"},
    {id:49, term:"Queue", desc:"FIFO data structure.", category:"Data Structure", example:"enqueue(1), enqueue(2) → dequeue()", complexity:"Intermediate"},
    {id:50, term:"Recursion", desc:"Function calling itself.", category:"Algorithm", example:"Factorial function", complexity:"Advanced"},
    {id:51, term:"REST", desc:"Architectural style for APIs.", category:"Web Development", example:"GET /users", complexity:"Intermediate"},
    {id:52, term:"Router", desc:"Directs requests to proper handler.", category:"Networking", example:"Express.js router", complexity:"Intermediate"},
    {id:53, term:"Script", desc:"File containing code.", category:"Programming Concepts", example:"app.js", complexity:"Beginner"},
    {id:54, term:"Server", desc:"Computer providing services over network.", category:"Networking", example:"Web server hosting a website", complexity:"Intermediate"},
    {id:55, term:"Stack", desc:"LIFO data structure.", category:"Data Structure", example:"push(1), push(2), pop()", complexity:"Intermediate"},
    {id:56, term:"String", desc:"Sequence of characters.", category:"Programming Concepts", example:"let s = 'Hello';", complexity:"Beginner"},
    {id:57, term:"Syntax", desc:"Rules defining a language's structure.", category:"Programming Concepts", example:"Python requires indentation", complexity:"Beginner"},
    {id:58, term:"Variable", desc:"Named storage for data.", category:"Programming Concepts", example:"let x = 5;", complexity:"Beginner"},
    {id:59, term:"Virtual Machine", desc:"Software emulating hardware environment.", category:"Computer Systems", example:"Java Virtual Machine", complexity:"Advanced"},
    {id:60, term:"Web Socket", desc:"Persistent two-way communication protocol.", category:"Networking", example:"Real-time chat", complexity:"Intermediate"},
    {id:61, term:"XML", desc:"Extensible Markup Language for data exchange.", category:"Data Format", example:"<user><name>Irene</name></user>", complexity:"Intermediate"},
    {id:62, term:"YAML", desc:"Human-readable data format.", category:"Data Format", example:"name: Irene\nage: 21", complexity:"Intermediate"},
    {id:63, term:"Algorithm Complexity", desc:"Measure of algorithm efficiency.", category:"Computer Science", example:"O(n^2)", complexity:"Advanced"},
    {id:64, term:"Asynchronous", desc:"Operations that occur independently of main program flow.", category:"Programming Concepts", example:"AJAX calls in JS", complexity:"Intermediate"},
    {id:65, term:"Binary Tree", desc:"Tree structure with nodes having up to 2 children.", category:"Data Structure", example:"BST for searching numbers", complexity:"Intermediate"},
    {id:66, term:"Cache Miss", desc:"When requested data is not in cache.", category:"Computer Systems", example:"CPU fetches from RAM", complexity:"Advanced"},
    {id:67, term:"Class Method", desc:"Function defined inside a class.", category:"Programming Concepts", example:"car.start()", complexity:"Intermediate"},
    {id:68, term:"Data Mining", desc:"Extracting patterns from large datasets.", category:"Data Science", example:"Finding buying patterns", complexity:"Advanced"},
    {id:69, term:"Data Type", desc:"Defines type of data variable can hold.", category:"Programming Concepts", example:"Integer, String, Boolean", complexity:"Beginner"},
    {id:70, term:"Deadlock", desc:"Processes wait indefinitely for resources.", category:"Computer Systems", example:"Two threads waiting on each other", complexity:"Advanced"},
    {id:71, term:"Dependency Injection", desc:"Technique to reduce tight coupling between classes.", category:"Programming Concepts", example:"Angular services", complexity:"Advanced"},
    {id:72, term:"Docker", desc:"Containerization platform.", category:"DevOps", example:"docker run ubuntu", complexity:"Intermediate"},
    {id:73, term:"Encryption Key", desc:"Value used to encrypt or decrypt data.", category:"Security", example:"AES key", complexity:"Advanced"},
    {id:74, term:"Event Loop", desc:"Handles asynchronous callbacks in JS.", category:"Programming Concepts", example:"Node.js event loop", complexity:"Advanced"},
    {id:75, term:"Exception", desc:"Error during program execution.", category:"Programming Concepts", example:"try { } catch(e) { }", complexity:"Intermediate"},
    {id:76, term:"Frameworks", desc:"Libraries that provide pre-built functionality.", category:"Programming Concepts", example:"Angular, Django", complexity:"Intermediate"},
    {id:77, term:"Garbage Collection", desc:"Automatic memory management.", category:"Programming Concepts", example:"Java garbage collector", complexity:"Intermediate"},
    {id:78, term:"Hash Table", desc:"Data structure mapping keys to values.", category:"Data Structure", example:"JS objects", complexity:"Intermediate"},
    {id:79, term:"HTTP Request", desc:"Message sent from client to server.", category:"Networking", example:"GET, POST requests", complexity:"Intermediate"},
    {id:80, term:"HTTP Response", desc:"Server's reply to client request.", category:"Networking", example:"200 OK, 404 Not Found", complexity:"Intermediate"},
    {id:81, term:"IDE", desc:"Integrated Development Environment.", category:"Development Tools", example:"VS Code, Eclipse", complexity:"Beginner"},
    {id:82, term:"Indexing", desc:"Improves database query performance.", category:"Database", example:"SQL indexes", complexity:"Intermediate"},
    {id:83, term:"JSON Web Token", desc:"Compact token for secure data transfer.", category:"Security", example:"Authentication token", complexity:"Intermediate"},
    {id:84, term:"Key-Value Store", desc:"Database storing key-value pairs.", category:"Database", example:"Redis", complexity:"Intermediate"},
    {id:85, term:"Library", desc:"Collection of pre-written code for reuse.", category:"Programming Concepts", example:"Lodash, jQuery", complexity:"Beginner"},
    {id:86, term:"LinkedHashMap", desc:"Map maintaining insertion order.", category:"Data Structure", example:"Java LinkedHashMap", complexity:"Intermediate"},
    {id:87, term:"Machine Code", desc:"Binary code executed by CPU.", category:"Computer Science", example:"10110011", complexity:"Advanced"},
    {id:88, term:"MVC", desc:"Model-View-Controller architecture.", category:"Software Architecture", example:"Web apps using MVC", complexity:"Intermediate"},
    {id:89, term:"Namespace", desc:"Logical container for identifiers.", category:"Programming Concepts", example:"JavaScript modules", complexity:"Intermediate"},
    {id:90, term:"Normalization", desc:"Database design to reduce redundancy.", category:"Database", example:"3NF tables", complexity:"Advanced"},
    {id:91, term:"Object Pool", desc:"Reuse objects to improve performance.", category:"Programming Concepts", example:"Thread pool", complexity:"Advanced"},
    {id:92, term:"Polymorphic Function", desc:"Function behaving differently based on input.", category:"Programming Concepts", example:"Overloaded function in Java", complexity:"Advanced"},
    {id:93, term:"Queueing Theory", desc:"Mathematical study of waiting lines.", category:"Computer Science", example:"Analyzing server request queues", complexity:"Advanced"},
    {id:94, term:"Recursion Depth", desc:"Number of nested recursive calls.", category:"Algorithm", example:"Factorial recursion depth", complexity:"Intermediate"},
    {id:95, term:"Refactoring", desc:"Improving code without changing behavior.", category:"Programming Concepts", example:"Renaming variables for clarity", complexity:"Intermediate"},
    {id:96, term:"Regular Expression", desc:"Pattern matching for strings.", category:"Programming Concepts", example:"/[a-z]+/", complexity:"Intermediate"},
    {id:97, term:"Relational Database", desc:"Database with structured tables and relationships.", category:"Database", example:"MySQL, PostgreSQL", complexity:"Intermediate"},
    {id:98, term:"REST API", desc:"API following REST principles.", category:"Web Development", example:"GET /users", complexity:"Intermediate"},
    {id:99, term:"Serialization", desc:"Converting object to byte stream.", category:"Programming Concepts", example:"JSON.stringify(obj)", complexity:"Intermediate"},
    {id:100, term:"Thread", desc:"Smallest sequence of programmed instructions.", category:"Computer Systems", example:"Java Thread", complexity:"Intermediate"}
  ]

    localStorage.terms = JSON.stringify(terms);
  }

  allTerms = JSON.parse(localStorage.terms);
}

// ===== AUTH =====
function loadAuth() {
  try {
    currentUser = JSON.parse(localStorage.auth || null);
  } catch {
    localStorage.removeItem('auth');
  }
}

function setupAuthForms() {
  const signup = document.getElementById('signupForm');
  const login = document.getElementById('loginForm');

  signup?.addEventListener('submit', handleSignup);
  login?.addEventListener('submit', handleLogin);
}

function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!name || !email || password.length < 6) return alertMsg('signupAlert', 'Invalid input', 'error');

  const users = JSON.parse(localStorage.users);
  if (users.some(u => u.email === email)) return alertMsg('signupAlert', 'Email exists', 'error');

  const role = email === 'irene@admin.com' ? 'admin' : 'user';
  users.push({ id: Date.now(), name, email, password, role });
  localStorage.users = JSON.stringify(users);
  alertMsg('signupAlert', 'Account created', 'success');
  setTimeout(() => location.href = 'login.html', 1200);
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const users = JSON.parse(localStorage.users);

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return alertMsg('loginAlert', 'Invalid credentials', 'error');

  localStorage.auth = JSON.stringify(user);
  location.href = 'dashboard.html';
}

function setupLogout() {
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('auth');
    location.href = 'index.html';
  });
}

// ===== DASHBOARD =====
function protectDashboard() {
  if (!currentUser) location.href = 'login.html';
}

function initDashboard() {
  showUserInfo();
  renderTerms();
  initTable();
}

// ===== UI =====
function showUserInfo() {
  const userGreeting = document.getElementById('userGreeting');
  const roleBadge = document.getElementById('roleBadge');
  const adminControls = document.getElementById('adminControls');
  const userControls = document.getElementById('userControls');
  const actionHeader = document.getElementById('actionHeader');

  if (userGreeting) userGreeting.textContent = `Welcome, ${currentUser.name}`;
  if (roleBadge) {
    roleBadge.textContent = currentUser.role.toUpperCase();
    roleBadge.className = `role-badge role-${currentUser.role}`;
  }

  if (currentUser.role === 'admin') {
    adminControls.style.display = 'flex';
    if (actionHeader) actionHeader.style.display = 'table-cell';
  } else {
    adminControls.style.display = 'none';
    if (actionHeader) actionHeader.style.display = 'none';
  }

  if (userControls) userControls.style.display = 'flex';
}

// ===== TERMS =====
function renderTerms() {
  const tbody = document.getElementById('termsTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';

  allTerms
    .sort((a, b) => a.term.localeCompare(b.term))
    .forEach(term => {
      tbody.innerHTML += `
        <tr>
          <td>${escape(term.term)}</td>
          <td>${escape(term.desc)}</td>
          <td>${escape(term.category)}</td>
          <td>${escape(term.example || '')}</td>
          <td>${escape(term.complexity)}</td>
          <td>
            ${currentUser.role === 'admin'
              ? `<button onclick="openEditTerm(${term.id})">✏️EDIT</button>
                 <button onclick="openDeleteTerm(${term.id})">🗑️DELETE</button>`
              : ''}
          </td>
        </tr>
      `;
    });
}

// ===== DATATABLE =====
function initTable() {
  if (dataTable) dataTable.destroy();
  dataTable = $('#termsTable').DataTable({
    dom: 'frtip',
    pageLength: 10,
    lengthMenu: [10, 20, 50, 100],
    order: [[0, 'asc']],
    columnDefs: [{ targets: 5, orderable: false, visible: currentUser.role === 'admin' }]
  });
}

// ===== CRUD =====
function openEditTerm(id) {
  const term = allTerms.find(t => t.id === id);
  if (!term) return;

  document.getElementById('editingTermId').value = id;
  document.getElementById('termName').value = term.term;
  document.getElementById('termDesc').value = term.desc;
  document.getElementById('termCategory').value = term.category;
  document.getElementById('termExample').value = term.example || '';
  document.getElementById('termComplexity').value = term.complexity;
  document.getElementById('modalTitle').textContent = 'Edit Term';
  document.getElementById('termModal').classList.add('show');
}

function openDeleteTerm(id) {
  deleteTargetId = id;
  const term = allTerms.find(t => t.id === id);
  if (!term) return;

  document.getElementById('deleteTermName').textContent = `"${term.term}"`;
  document.getElementById('deleteModal').classList.add('show');
}

function confirmDelete() {
  allTerms = allTerms.filter(t => t.id !== deleteTargetId);
  localStorage.terms = JSON.stringify(allTerms);
  closeDeleteModal();
  renderTerms();
  initTable();
}

function openAddTermModal() {
  document.getElementById('termForm').reset();
  document.getElementById('editingTermId').value = '';
  document.getElementById('modalTitle').textContent = 'Add New Term';
  document.getElementById('termModal').classList.add('show');
}

function closeTermModal() { document.getElementById('termModal').classList.remove('show'); }
function closeDeleteModal() { document.getElementById('deleteModal').classList.remove('show'); }

function handleTermSubmit(e) {
  e.preventDefault();

  const editingTermId = document.getElementById('editingTermId').value;
  const termName = document.getElementById('termName').value.trim();
  const termDesc = document.getElementById('termDesc').value.trim();
  const termCategory = document.getElementById('termCategory').value.trim();
  const termExample = document.getElementById('termExample').value.trim();
  const termComplexity = document.getElementById('termComplexity').value;

  if (!termName || !termDesc || !termCategory || !termComplexity) {
    return alertMsg('alertBox', 'All fields are required', 'error');
  }

  if (editingTermId) {
    // Update term
    const idx = allTerms.findIndex(t => t.id === parseInt(editingTermId));
    if (idx >= 0) {
      allTerms[idx] = { id: parseInt(editingTermId), term: termName, desc: termDesc, category: termCategory, example: termExample, complexity: termComplexity };
    }
    alertMsg('alertBox', 'Term updated!', 'success');
  } else {
   
    const newTerm = { id: Date.now(), term: termName, desc: termDesc, category: termCategory, example: termExample, complexity: termComplexity };
    allTerms.push(newTerm);
    alertMsg('alertBox', 'Term added!', 'success');
  }

  localStorage.terms = JSON.stringify(allTerms);
  closeTermModal();
  renderTerms();
  initTable();
}

function toggleMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  }
}

function escape(str) {
  return str.replace(/[&<>"']/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;' })[m]);
}

function alertMsg(id, msg, type) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.className = `alert show ${type}`;
  setTimeout(() => el.classList.remove('show'), 3500);
}
