// QuestionDictionary.ts
export interface QuizQuestion {
    id: string;
    text: string;
    options: string[];
    correctAnswer: string;
    domain?: string;
    education?: string;
  }
  
  export const APTITUDE_QUESTIONS: QuizQuestion[] = [
    {
        id: 'alt1',
        text: 'A plane ascends at a rate of 1200 meters per minute. How high will it be after 7 minutes?',
        options: ['8400 meters', '7200 meters', '9600 meters', '6000 meters'],
        correctAnswer: '8400 meters'
    },
    {
        id: 'alt2',
        text: 'A pilot reduces speed by 15% to save fuel. If the initial speed was 600 km/h, what is the new speed?',
        options: ['510 km/h', '520 km/h', '480 km/h', '540 km/h'],
        correctAnswer: '510 km/h'
    },
    {
        id: 'alt3',
        text: 'Two birds are flying towards each other 300 km apart at speeds of 60 km/h and 90 km/h. How long until they meet?',
        options: ['2 hours', '3 hours', '1.5 hours', '2.5 hours'],
        correctAnswer: '2 hours'
    },
    {
        id: 'alt4',
        text: 'An air balloon is rising at 10 m/s. After 45 seconds, how far has it traveled?',
        options: ['450 meters', '400 meters', '475 meters', '500 meters'],
        correctAnswer: '450 meters'
    },
    {
        id: 'alt5',
        text: 'If a jet covers 1/3 of its journey in 2 hours at 300 km/h, how long will it take to complete the journey at the same speed?',
        options: ['4 hours', '6 hours', '8 hours', '9 hours'],
        correctAnswer: '6 hours'
    }
];

export const DOMAIN_SPECIFIC_QUESTIONS: { [key: string]: QuizQuestion[] } = {
  'Data Science': [
    {
      id: 'ds1',
      text: 'What is the primary purpose of cross-validation in machine learning?',
      options: ['Increase model complexity', 'Prevent overfitting', 'Reduce training time', 'Improve data collection'],
      correctAnswer: 'Prevent overfitting',
      domain: 'Data Science'
    },
    {
      id: 'ds2',
      text: 'Which algorithm is best for handling non-linear relationships?',
      options: ['Linear Regression', 'Decision Trees', 'K-Means', 'Simple Linear Model'],
      correctAnswer: 'Decision Trees',
      domain: 'Data Science'
    },
    {
      id: 'ds3',
      text: 'What does PCA stand for in data science?',
      options: ['Predictive Computational Analysis', 'Principal Component Analysis', 'Probabilistic Correlation Algorithm', 'Primary Computational Approach'],
      correctAnswer: 'Principal Component Analysis',
      domain: 'Data Science'
    },
    {
      id: 'ds4',
      text: 'Which library is primarily used for data manipulation in Python?',
      options: ['NumPy', 'Pandas', 'Matplotlib', 'SciPy'],
      correctAnswer: 'Pandas',
      domain: 'Data Science'
    },
    {
      id: 'ds5',
      text: 'What is the purpose of the confusion matrix?',
      options: ['Data Visualization', 'Model Performance Evaluation', 'Data Cleaning', 'Feature Selection'],
      correctAnswer: 'Model Performance Evaluation',
      domain: 'Data Science'
    },
    {
      id: 'ds6',
      text: 'Which type of machine learning is used for clustering data?',
      options: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Deep Learning'],
      correctAnswer: 'Unsupervised Learning',
      domain: 'Data Science'
    },
    {
      id: 'ds7',
      text: 'What is overfitting in machine learning?',
      options: ['The model performs well on training data but poorly on new data', 'The model performs poorly on training and test data', 'The model has insufficient data to learn', 'The model requires feature scaling'],
      correctAnswer: 'The model performs well on training data but poorly on new data',
      domain: 'Data Science'
    },
    {
      id: 'ds8',
      text: 'Which metric is used to evaluate regression models?',
      options: ['Accuracy', 'Recall', 'Mean Squared Error', 'Precision'],
      correctAnswer: 'Mean Squared Error',
      domain: 'Data Science'
    },
    {
      id: 'ds9',
      text: 'Which Python library is used for creating visualizations?',
      options: ['TensorFlow', 'Matplotlib', 'SciKit-Learn', 'Keras'],
      correctAnswer: 'Matplotlib',
      domain: 'Data Science'
    },
    {
      id: 'ds10',
      text: 'What is feature engineering?',
      options: ['Creating new features from raw data', 'Training the machine learning model', 'Splitting the dataset into training and testing', 'Cleaning data to remove duplicates'],
      correctAnswer: 'Creating new features from raw data',
      domain: 'Data Science'
    }
  ],
  'Web Development': [
    {
      id: 'wd1',
      text: 'What does HTML stand for?',
      options: ['Hyper Text Markup Language', 'Hyperlink Text Markup Language', 'Hyper Text Manipulation Language', 'Hyper Transform Markup Language'],
      correctAnswer: 'Hyper Text Markup Language',
      domain: 'Web Development'
    },
    {
      id: 'wd2',
      text: 'Which of the following is a CSS framework?',
      options: ['React', 'Bootstrap', 'Node.js', 'Django'],
      correctAnswer: 'Bootstrap',
      domain: 'Web Development'
    },
    {
      id: 'wd3',
      text: 'Which HTTP method is used to update resources?',
      options: ['GET', 'PUT', 'DELETE', 'POST'],
      correctAnswer: 'PUT',
      domain: 'Web Development'
    },
    {
      id: 'wd4',
      text: 'What is the default behavior of Flexbox?',
      options: ['Column layout', 'Row layout', 'Inline layout', 'Grid layout'],
      correctAnswer: 'Row layout',
      domain: 'Web Development'
    },
    {
      id: 'wd5',
      text: 'Which JavaScript framework is widely used for building SPAs (Single Page Applications)?',
      options: ['Angular', 'Bootstrap', 'Django', 'Flask'],
      correctAnswer: 'Angular',
      domain: 'Web Development'
    },
    {
      id: 'wd6',
      text: 'What does the DOM stand for in web development?',
      options: ['Document Object Model', 'Data Object Manager', 'Data Organization Model', 'Document Order Mapping'],
      correctAnswer: 'Document Object Model',
      domain: 'Web Development'
    },
    {
      id: 'wd7',
      text: 'What is the purpose of a CDN?',
      options: ['Increase security', 'Reduce server load and improve loading speed', 'Backup data', 'Streamline user authentication'],
      correctAnswer: 'Reduce server load and improve loading speed',
      domain: 'Web Development'
    },
    {
      id: 'wd8',
      text: 'Which tag is used to link JavaScript in an HTML file?',
      options: ['<style>', '<script>', '<link>', '<meta>'],
      correctAnswer: '<script>',
      domain: 'Web Development'
    },
    {
      id: 'wd9',
      text: 'What is the box model in CSS?',
      options: ['A model defining content, padding, margin, and border', 'A JavaScript design pattern', 'A layout algorithm for grid systems', 'An alternative to Flexbox'],
      correctAnswer: 'A model defining content, padding, margin, and border',
      domain: 'Web Development'
    },
    {
      id: 'wd10',
      text: 'What does AJAX stand for?',
      options: ['Asynchronous JavaScript and XML', 'Advanced JSON and XML', 'Active Java Application eXchange', 'Automatic JavaScript and XML'],
      correctAnswer: 'Asynchronous JavaScript and XML',
      domain: 'Web Development'
    }
  ],
  'Mobile Development': [
    {
      id: 'md1',
      text: 'Which language is primarily used for developing iOS applications?',
      options: ['Java', 'Swift', 'Kotlin', 'Objective-C'],
      correctAnswer: 'Swift',
      domain: 'Mobile Development'
    },
    {
      id: 'md2',
      text: 'What does APK stand for in Android development?',
      options: ['Android Package Kit', 'Application Program Kit', 'Android Programming Key', 'App Package Kernel'],
      correctAnswer: 'Android Package Kit',
      domain: 'Mobile Development'
    },
    {
      id: 'md3',
      text: 'Which layout is used in Android to arrange elements in a linear direction?',
      options: ['ConstraintLayout', 'LinearLayout', 'FrameLayout', 'RelativeLayout'],
      correctAnswer: 'LinearLayout',
      domain: 'Mobile Development'
    },
    {
      id: 'md4',
      text: 'What is the primary use of Flutter in mobile development?',
      options: ['Cross-platform development', 'Backend API design', 'Database management', 'Server-side scripting'],
      correctAnswer: 'Cross-platform development',
      domain: 'Mobile Development'
    },
    {
      id: 'md5',
      text: 'What is the purpose of a ViewModel in MVVM architecture?',
      options: ['Handle UI logic and data binding', 'Define database schema', 'Handle network calls', 'Render views'],
      correctAnswer: 'Handle UI logic and data binding',
      domain: 'Mobile Development'
    },
    {
      id: 'md6',
      text: 'Which Android component is responsible for managing UI and user interaction?',
      options: ['Service', 'Content Provider', 'Activity', 'Broadcast Receiver'],
      correctAnswer: 'Activity',
      domain: 'Mobile Development'
    },
    {
      id: 'md7',
      text: 'Which library is commonly used for dependency injection in Android?',
      options: ['Dagger', 'Retrofit', 'Room', 'Glide'],
      correctAnswer: 'Dagger',
      domain: 'Mobile Development'
    },
    {
      id: 'md8',
      text: 'What is the purpose of Gradle in Android development?',
      options: ['Dependency management and build automation', 'UI design and layout', 'Database schema generation', 'Memory management'],
      correctAnswer: 'Dependency management and build automation',
      domain: 'Mobile Development'
    },
    {
      id: 'md9',
      text: 'Which tool is used for debugging layouts in Android?',
      options: ['ADB', 'Layout Inspector', 'Lint', 'ProGuard'],
      correctAnswer: 'Layout Inspector',
      domain: 'Mobile Development'
    },
    {
      id: 'md10',
      text: 'Which file is used to declare permissions in an Android app?',
      options: ['build.gradle', 'AndroidManifest.xml', 'settings.gradle', 'proguard-rules.pro'],
      correctAnswer: 'AndroidManifest.xml',
      domain: 'Mobile Development'
    }
  ],
  'Cybersecurity': [
    {
      id: 'cs1',
      text: 'What is the main purpose of a firewall?',
      options: ['Encrypt data', 'Prevent unauthorized access', 'Backup data', 'Monitor CPU usage'],
      correctAnswer: 'Prevent unauthorized access',
      domain: 'Cybersecurity'
    },
    {
      id: 'cs2',
      text: 'Which type of attack involves overwhelming a server with traffic?',
      options: ['Phishing', 'Man-in-the-middle', 'Denial of Service', 'SQL Injection'],
      correctAnswer: 'Denial of Service',
      domain: 'Cybersecurity'
    },
    {
      id: 'cs3',
      text: 'What does SSL stand for?',
      options: ['Secure Sockets Layer', 'Safe Server Link', 'Secure System Login', 'Simple Security Layer'],
      correctAnswer: 'Secure Sockets Layer',
      domain: 'Cybersecurity'
    },
    {
      id: 'cs4',
      text: 'Which type of malware encrypts data and demands payment for decryption?',
      options: ['Trojan Horse', 'Ransomware', 'Spyware', 'Worm'],
      correctAnswer: 'Ransomware',
      domain: 'Cybersecurity'
    },
    {
      id: 'cs5',
      text: 'What is the primary function of a VPN?',
      options: ['Improve network speed', 'Provide secure remote access', 'Increase internet bandwidth', 'Store user credentials'],
      correctAnswer: 'Provide secure remote access',
      domain: 'Cybersecurity'
    },
    {
      id: 'cs6',
      text: 'What does the CIA triad stand for in cybersecurity?',
      options: ['Confidentiality, Integrity, Availability', 'Confidentiality, Integration, Authentication', 'Criticality, Integration, Authorization', 'Confidentiality, Identification, Accessibility'],
      correctAnswer: 'Confidentiality, Integrity, Availability',
      domain: 'Cybersecurity'
    },
    {
      id: 'cs7',
      text: 'Which of the following is a type of phishing attack?',
      options: ['Spear Phishing', 'SQL Injection', 'Brute Force', 'Cross-Site Scripting'],
      correctAnswer: 'Spear Phishing',
      domain: 'Cybersecurity'
    },
    {
      id: 'cs8',
      text: 'What is two-factor authentication?',
      options: ['Using two passwords', 'Using two different devices', 'Verifying identity with two forms of evidence', 'Changing passwords every two weeks'],
      correctAnswer: 'Verifying identity with two forms of evidence',
      domain: 'Cybersecurity'
    },
    {
      id: 'cs9',
      text: 'What is the purpose of hashing in cybersecurity?',
      options: ['Encrypt data for transfer', 'Convert data into a fixed-size value', 'Generate network traffic logs', 'Authenticate servers'],
      correctAnswer: 'Convert data into a fixed-size value',
      domain: 'Cybersecurity'
    },
    {
      id: 'cs10',
      text: 'Which tool is commonly used for penetration testing?',
      options: ['Wireshark', 'Kali Linux', 'Burp Suite', 'All of the above'],
      correctAnswer: 'All of the above',
      domain: 'Cybersecurity'
    }
  ],
  'Cloud Computing': [
    {
      id: 'cc1',
      text: 'What is the primary advantage of cloud computing?',
      options: ['Reduced cost and scalability', 'Increased network latency', 'Local data storage', 'Improved hardware performance'],
      correctAnswer: 'Reduced cost and scalability',
      domain: 'Cloud Computing'
    },
    {
      id: 'cc2',
      text: 'Which of these is an example of IaaS?',
      options: ['AWS EC2', 'Google Drive', 'Salesforce', 'Docker'],
      correctAnswer: 'AWS EC2',
      domain: 'Cloud Computing'
    },
    {
      id: 'cc3',
      text: 'What does SaaS stand for?',
      options: ['Software as a Service', 'Storage and Security', 'System as a Service', 'Software and Applications'],
      correctAnswer: 'Software as a Service',
      domain: 'Cloud Computing'
    },
    {
      id: 'cc4',
      text: 'What is the role of an API Gateway in cloud services?',
      options: ['Monitoring network activity', 'Routing API requests', 'Performing database queries', 'Encrypting data'],
      correctAnswer: 'Routing API requests',
      domain: 'Cloud Computing'
    },
    {
      id: 'cc5',
      text: 'What is serverless computing?',
      options: ['No servers are used', 'Servers are hidden from developers', 'Servers are deployed in private clouds', 'Servers run on virtual machines only'],
      correctAnswer: 'Servers are hidden from developers',
      domain: 'Cloud Computing'
    },
    {
      id: 'cc6',
      text: 'Which of the following is an example of Infrastructure as a Service (IaaS)?',
      options: ['AWS EC2', 'Google Docs', 'Azure Logic Apps', 'Dropbox'],
      correctAnswer: 'AWS EC2',
      domain: 'Cloud Computing'
    },
    {
      id: 'cc7',
      text: 'What does serverless computing imply?',
      options: ['No physical servers are used', 'Scaling is handled automatically', 'Applications run without any coding', 'Cloud providers do not charge for usage'],
      correctAnswer: 'Scaling is handled automatically',
      domain: 'Cloud Computing'
    },
    {
      id: 'cc8',
      text: 'Which command-line tool is commonly used to manage AWS resources?',
      options: ['AWS CLI', 'Kubernetes CLI', 'Azure PowerShell', 'Terraform'],
      correctAnswer: 'AWS CLI',
      domain: 'Cloud Computing'
    },
    {
      id: 'cc9',
      text: 'What is a key advantage of a multi-cloud strategy?',
      options: ['Reduced latency', 'Vendor lock-in avoidance', 'Eliminates all cloud costs', 'Higher data redundancy'],
      correctAnswer: 'Vendor lock-in avoidance',
      domain: 'Cloud Computing'
    },
    {
      id: 'cc10',
      text: 'What does “scalability” in cloud computing refer to?',
      options: ['Ability to increase resources on demand', 'Faster data processing', 'Minimizing data redundancy', 'Maintaining network security'],
      correctAnswer: 'Ability to increase resources on demand',
      domain: 'Cloud Computing'
    }
    
  ],
  'DevOps': [
    {
      id: 'do1',
      text: 'What is the primary purpose of CI/CD in DevOps?',
      options: ['Automate code deployment', 'Improve UI design', 'Write test cases', 'Optimize server performance'],
      correctAnswer: 'Automate code deployment',
      domain: 'DevOps'
    },
    {
      id: 'do2',
      text: 'Which tool is commonly used for container orchestration?',
      options: ['Docker', 'Kubernetes', 'Ansible', 'Jenkins'],
      correctAnswer: 'Kubernetes',
      domain: 'DevOps'
    },
    {
      id: 'do3',
      text: 'What does Infrastructure as Code (IaC) allow teams to do?',
      options: ['Manage infrastructure with code', 'Develop applications faster', 'Monitor infrastructure performance', 'Secure infrastructure with policies'],
      correctAnswer: 'Manage infrastructure with code',
      domain: 'DevOps'
    },
    {
      id: 'do4',
      text: 'Which command is used to view running containers in Docker?',
      options: ['docker ps', 'docker run', 'docker stop', 'docker build'],
      correctAnswer: 'docker ps',
      domain: 'DevOps'
    },
    {
      id: 'do5',
      text: 'What is the purpose of a reverse proxy in DevOps?',
      options: ['Distribute traffic to servers', 'Encrypt application data', 'Monitor network usage', 'Optimize memory allocation'],
      correctAnswer: 'Distribute traffic to servers',
      domain: 'DevOps'
    },
    {
      id: 'do6',
      text: 'Which of these is a popular configuration management tool?',
      options: ['Terraform', 'Ansible', 'Nagios', 'AWS CLI'],
      correctAnswer: 'Ansible',
      domain: 'DevOps'
    },
    {
      id: 'do7',
      text: 'What does a load balancer do in a DevOps setup?',
      options: ['Distributes traffic among servers', 'Manages server storage', 'Monitors server health', 'Caches static content'],
      correctAnswer: 'Distributes traffic among servers',
      domain: 'DevOps'
    },
    {
      id: 'do8',
      text: 'Which DevOps tool is used for continuous integration?',
      options: ['Jenkins', 'Kubernetes', 'Docker', 'Terraform'],
      correctAnswer: 'Jenkins',
      domain: 'DevOps'
    },
    {
      id: 'do9',
      text: 'What does blue-green deployment refer to?',
      options: ['Deploying applications on different servers', 'Seamless switching between versions', 'Testing two environments simultaneously', 'Using colored containers for visibility'],
      correctAnswer: 'Seamless switching between versions',
      domain: 'DevOps'
    },
    {
      id: 'do10',
      text: 'Which tool is used for logging and monitoring in a DevOps pipeline?',
      options: ['ELK Stack', 'Docker Compose', 'Terraform', 'Ansible'],
      correctAnswer: 'ELK Stack',
      domain: 'DevOps'
    }
  ],
  'AI/ML': [
    {
      id: 'ai1',
      text: 'What is a common method for training a neural network?',
      options: ['Backpropagation', 'Gradient Ascent', 'Reinforcement Optimization', 'Rule-Based Programming'],
      correctAnswer: 'Backpropagation',
      domain: 'AI/ML'
    },
    {
      id: 'ai2',
      text: 'What is overfitting in machine learning?',
      options: ['A model performs poorly on unseen data', 'A model performs well on unseen data', 'A model has too much training data', 'A model is optimized for computational speed'],
      correctAnswer: 'A model performs poorly on unseen data',
      domain: 'AI/ML'
    },
    {
      id: 'ai3',
      text: 'Which of these is a supervised learning algorithm?',
      options: ['K-Means', 'Linear Regression', 'DBSCAN', 'Apriori'],
      correctAnswer: 'Linear Regression',
      domain: 'AI/ML'
    },
    {
      id: 'ai4',
      text: 'What is the purpose of the activation function in neural networks?',
      options: ['Introduce non-linearity', 'Initialize weights', 'Compute gradients', 'Simplify training data'],
      correctAnswer: 'Introduce non-linearity',
      domain: 'AI/ML'
    },
    {
      id: 'ai5',
      text: 'What does LSTM stand for?',
      options: ['Long Short-Term Memory', 'Linear Systematic Training Model', 'Large System Training Module', 'Logical Statistical Training Machine'],
      correctAnswer: 'Long Short-Term Memory',
      domain: 'AI/ML'
    },
    {
      id: 'ai6',
      text: 'Which metric is used to evaluate classification models?',
      options: ['Accuracy', 'Mean Squared Error', 'Log-Loss', 'R-Squared'],
      correctAnswer: 'Accuracy',
      domain: 'AI/ML'
    },
    {
      id: 'ai7',
      text: 'What is the role of the learning rate in training a model?',
      options: ['Control weight updates', 'Improve dataset size', 'Increase number of epochs', 'Control hardware resources'],
      correctAnswer: 'Control weight updates',
      domain: 'AI/ML'
    },
    {
      id: 'ai8',
      text: 'What does reinforcement learning rely on?',
      options: ['Reward and punishment', 'Large labeled datasets', 'Fixed rules', 'Random search algorithms'],
      correctAnswer: 'Reward and punishment',
      domain: 'AI/ML'
    },
    {
      id: 'ai9',
      text: 'Which Python library is used for deep learning?',
      options: ['TensorFlow', 'Pandas', 'Matplotlib', 'Scikit-learn'],
      correctAnswer: 'TensorFlow',
      domain: 'AI/ML'
    },
    {
      id: 'ai10',
      text: 'What is the purpose of dropout in neural networks?',
      options: ['Prevent overfitting', 'Increase computation speed', 'Normalize data', 'Reduce model complexity'],
      correctAnswer: 'Prevent overfitting',
      domain: 'AI/ML'
    }
  ],
  'Game Development': [
    {
      id: 'gd1',
      text: 'Which game engine uses Blueprints as a visual scripting system?',
      options: ['Unity', 'Unreal Engine', 'Godot', 'CryEngine'],
      correctAnswer: 'Unreal Engine',
      domain: 'Game Development'
    },
    {
      id: 'gd2',
      text: 'What does FPS stand for in gaming?',
      options: ['First Person Shooter', 'Frames Per Second', 'File Processing Speed', 'Fixed Player Strategy'],
      correctAnswer: 'Frames Per Second',
      domain: 'Game Development'
    },
    {
      id: 'gd3',
      text: 'Which programming language is primarily used in Unity?',
      options: ['C#', 'Python', 'C++', 'Java'],
      correctAnswer: 'C#',
      domain: 'Game Development'
    },
    {
      id: 'gd4',
      text: 'What is the purpose of a collider in game development?',
      options: ['Handle physics interactions', 'Optimize rendering', 'Load textures', 'Manage animations'],
      correctAnswer: 'Handle physics interactions',
      domain: 'Game Development'
    },
    {
      id: 'gd5',
      text: 'Which format is commonly used for 3D models in game development?',
      options: ['FBX', 'PNG', 'JSON', 'CSV'],
      correctAnswer: 'FBX',
      domain: 'Game Development'
    },
    {
      id: 'gd6',
      text: 'What is the primary purpose of a game loop in game development?',
      options: ['Render graphics', 'Handle physics updates', 'Process player inputs', 'All of the above'],
      correctAnswer: 'All of the above',
      domain: 'Game Development'
    },
    {
      id: 'gd7',
      text: 'Which of these is an example of a physics engine used in game development?',
      options: ['Box2D', 'Unity', 'OpenGL', 'Unreal Engine'],
      correctAnswer: 'Box2D',
      domain: 'Game Development'
    },
    {
      id: 'gd8',
      text: 'What does the term "LOD" stand for in game optimization?',
      options: ['Level of Detail', 'Length of Development', 'Lighting Object Design', 'Logic Oriented Design'],
      correctAnswer: 'Level of Detail',
      domain: 'Game Development'
    },
    {
      id: 'gd9',
      text: 'Which design pattern is commonly used for game entities?',
      options: ['Component', 'Factory', 'Observer', 'Singleton'],
      correctAnswer: 'Component',
      domain: 'Game Development'
    },
    {
      id: 'gd10',
      text: 'What is the purpose of shaders in game graphics?',
      options: ['Define object textures', 'Calculate lighting and effects', 'Optimize gameplay mechanics', 'Handle collision detection'],
      correctAnswer: 'Calculate lighting and effects',
      domain: 'Game Development'
    }
    
  ],

};

export const CURRENT_TRENDS_QUESTIONS: QuizQuestion[] = [
  {
    id: 'trend1',
    text: 'What is the purpose of AI explainability in modern machine learning systems?',
    options: ['Enhance model speed', 'Make decisions interpretable', 'Reduce dataset size', 'Increase neural network layers'],
    correctAnswer: 'Make decisions interpretable'
  },
  {
    id: 'trend2',
    text: 'Which cloud computing trend emphasizes real-time data processing at the source?',
    options: ['Edge Computing', 'Centralized Storage', 'Grid Computing', 'Mainframe Systems'],
    correctAnswer: 'Edge Computing'
  },
  {
    id: 'trend3',
    text: 'What key advantage does zero-trust security provide in cybersecurity?',
    options: ['No need for encryption', 'Assumes every entity is a threat', 'Faster network connections', 'Removes the need for firewalls'],
    correctAnswer: 'Assumes every entity is a threat'
  },
  {
    id: 'trend4',
    text: 'What type of AI model architecture is dominating Natural Language Processing (NLP) advancements?',
    options: ['Convolutional Neural Networks (CNNs)', 'Transformers', 'Decision Trees', 'K-Nearest Neighbors (KNN)'],
    correctAnswer: 'Transformers'
  },
  {
    id: 'trend5',
    text: 'Which software development methodology emphasizes incremental delivery through collaboration and adaptability?',
    options: ['Waterfall', 'Agile', 'Rapid Application Development', 'Spiral Model'],
    correctAnswer: 'Agile'
  },
  {
    id: 'trend6',
    text: 'What is the primary feature of containerization tools like Docker in software deployment?',
    options: ['Code Compilation', 'Environment Consistency', 'Manual Scaling', 'Single-Thread Execution'],
    correctAnswer: 'Environment Consistency'
  },
  {
    id: 'trend7',
    text: 'What is the primary benefit of serverless architecture in cloud computing?',
    options: ['High manual control', 'Automatic scaling and cost efficiency', 'Dedicated server allocation', 'Lower latency than edge computing'],
    correctAnswer: 'Automatic scaling and cost efficiency'
  },
  {
    id: 'trend8',
    text: 'What technology powers secure and verifiable digital transactions in blockchain systems?',
    options: ['Digital Signatures', 'Firewalls', 'AI-Driven Encryption', 'CAPTCHA Systems'],
    correctAnswer: 'Digital Signatures'
  },
  {
    id: 'trend9',
    text: 'Which modern DevOps trend focuses on combining development, security, and operations?',
    options: ['GitOps', 'SecDevOps', 'Automation Only', 'Waterfall Development'],
    correctAnswer: 'SecDevOps'
  },
  {
    id: 'trend10',
    text: 'What innovation is transforming network traffic analysis in cybersecurity?',
    options: ['Deep Packet Inspection', 'Zero-Day Exploits', 'Quantum Cryptography', 'AI-Powered Anomaly Detection'],
    correctAnswer: 'AI-Powered Anomaly Detection'
  },
  {
    id: 'trend11',
    text: 'What is a key feature of 5G technology relevant to IoT development?',
    options: ['High latency', 'Low energy efficiency', 'Ultra-low latency', 'Limited device connectivity'],
    correctAnswer: 'Ultra-low latency'
  },
  {
    id: 'trend12',
    text: 'What is the main advantage of quantum computing for AI algorithms?',
    options: ['Faster classical calculations', 'Handling non-linear optimization problems', 'Reducing data sizes', 'Eliminating GPU dependencies'],
    correctAnswer: 'Handling non-linear optimization problems'
  },
  {
    id: 'trend13',
    text: 'What programming trend is being used for scalable, event-driven architectures?',
    options: ['Procedural Programming', 'Event-Driven Programming', 'Declarative Programming', 'Data-Oriented Programming'],
    correctAnswer: 'Event-Driven Programming'
  },
  {
    id: 'trend14',
    text: 'Which AI technique is being heavily utilized for generating content such as images and text?',
    options: ['Supervised Learning', 'Generative Adversarial Networks (GANs)', 'Reinforcement Learning', 'Clustering Algorithms'],
    correctAnswer: 'Generative Adversarial Networks (GANs)'
  },
  {
    id: 'trend15',
    text: 'What is the primary focus of FinOps in cloud computing?',
    options: ['Budget optimization for cloud spending', 'Increasing network bandwidth', 'Automating deployment pipelines', 'Improving encryption standards'],
    correctAnswer: 'Budget optimization for cloud spending'
  },
  {
    id: 'trend16',
    text: 'What is a key characteristic of modern microservices architectures?',
    options: ['Monolithic Design', 'Decentralized Data Management', 'Single Deployment Unit', 'Centralized Scaling'],
    correctAnswer: 'Decentralized Data Management'
  },
  {
    id: 'trend17',
    text: 'What emerging trend in gaming is being driven by AI?',
    options: ['Static NPCs', 'Procedural Content Generation', 'Manual Animation', 'Two-Dimensional Textures'],
    correctAnswer: 'Procedural Content Generation'
  },
  {
    id: 'trend18',
    text: 'What is the significance of federated learning in machine learning?',
    options: ['Distributed model training without sharing data', 'Local data processing without cloud usage', 'Reduced need for GPUs', 'Improved dimensionality reduction'],
    correctAnswer: 'Distributed model training without sharing data'
  },
  {
    id: 'trend19',
    text: 'What innovation in web development enables highly interactive web applications?',
    options: ['Progressive Web Apps (PWAs)', 'Static Sites', 'REST APIs', 'Web Scraping'],
    correctAnswer: 'Progressive Web Apps (PWAs)'
  },
  {
    id: 'trend20',
    text: 'What is the primary goal of observability in modern software systems?',
    options: ['Error-free execution', 'Debugging without logs', 'Proactive system monitoring and insights', 'Static code analysis'],
    correctAnswer: 'Proactive system monitoring and insights'
  }
];

  
export const EDUCATION_QUESTIONS: {[key: string]: QuizQuestion[]} = {
  "Bachelor's": [
    {
      id: 'edu1',
      text: 'What is the time complexity of a binary search algorithm?',
      options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'],
      correctAnswer: 'O(log n)',
      education: "Bachelor's"
    },
    {
      id: 'edu2',
      text: 'Which data structure is commonly used to implement a stack?',
      options: ['Array', 'Queue', 'Graph', 'Tree'],
      correctAnswer: 'Array',
      education: "Bachelor's"
    },
    {
      id: 'edu3',
      text: 'What is the main goal of normalization in database design?',
      options: ['Increase redundancy', 'Minimize redundancy', 'Reduce database size', 'Speed up queries'],
      correctAnswer: 'Minimize redundancy',
      education: "Bachelor's"
    },
    {
      id: 'edu4',
      text: 'Which programming language is primarily used for developing Android applications?',
      options: ['Python', 'Kotlin', 'C++', 'PHP'],
      correctAnswer: 'Kotlin',
      education: "Bachelor's"
    },
    {
      id: 'edu5',
      text: 'Which layer of the OSI model handles routing and forwarding?',
      options: ['Data Link Layer', 'Transport Layer', 'Network Layer', 'Physical Layer'],
      correctAnswer: 'Network Layer',
      education: "Bachelor's"
    },
    {
      id: 'edu6',
      text: 'What is the purpose of a compiler in programming?',
      options: ['Convert high-level code into machine code', 'Debug the code', 'Execute the code', 'Interpret scripts'],
      correctAnswer: 'Convert high-level code into machine code',
      education: "Bachelor's"
    },
    {
      id: 'edu7',
      text: 'Which algorithm is commonly used for shortest path calculation?',
      options: ['Prim\'s Algorithm', 'Dijkstra\'s Algorithm', 'DFS', 'Kruskal\'s Algorithm'],
      correctAnswer: 'Dijkstra\'s Algorithm',
      education: "Bachelor's"
    },
    {
      id: 'edu8',
      text: 'What is the key characteristic of an object in object-oriented programming?',
      options: ['Encapsulation', 'Abstraction', 'Recursion', 'None of the above'],
      correctAnswer: 'Encapsulation',
      education: "Bachelor's"
    },
    {
      id: 'edu9',
      text: 'Which protocol is used for secure communication over the internet?',
      options: ['HTTP', 'FTP', 'SSL/TLS', 'SMTP'],
      correctAnswer: 'SSL/TLS',
      education: "Bachelor's"
    },
    {
      id: 'edu10',
      text: 'What does "Big O Notation" measure in algorithms?',
      options: ['Accuracy', 'Complexity', 'Efficiency', 'Scalability'],
      correctAnswer: 'Complexity',
      education: "Bachelor's"
    }
  ],
  "Master's": [
    {
      id: 'edu11',
      text: 'What is the primary focus of research in a Master\'s program in computer science?',
      options: ['Industrial Training', 'Advanced Theoretical Concepts', 'Job Placements', 'Certifications'],
      correctAnswer: 'Advanced Theoretical Concepts',
      education: "Master's"
    },
    {
      id: 'edu12',
      text: 'Which algorithm is used to train neural networks efficiently?',
      options: ['Gradient Descent', 'A* Search', 'BFS', 'Backtracking'],
      correctAnswer: 'Gradient Descent',
      education: "Master's"
    },
    {
      id: 'edu13',
      text: 'What is the purpose of a distributed database system?',
      options: ['Centralize data storage', 'Store data locally only', 'Enable replication and fault tolerance', 'None of the above'],
      correctAnswer: 'Enable replication and fault tolerance',
      education: "Master's"
    },
    {
      id: 'edu14',
      text: 'Which cryptographic algorithm is widely used for data encryption?',
      options: ['SHA-256', 'AES', 'RSA', 'MD5'],
      correctAnswer: 'AES',
      education: "Master's"
    },
    {
      id: 'edu15',
      text: 'What is a significant advantage of functional programming?',
      options: ['Side effects are minimized', 'Easier debugging', 'Efficient memory usage', 'Faster runtime'],
      correctAnswer: 'Side effects are minimized',
      education: "Master's"
    },
    {
      id: 'edu16',
      text: 'What is the main advantage of microservices architecture over monolithic architecture?',
      options: ['Faster development', 'Independent deployment of services', 'Easier debugging', 'Centralized data handling'],
      correctAnswer: 'Independent deployment of services',
      education: "Master's"
    },
    {
      id: 'edu17',
      text: 'Which AI model is most suitable for image recognition tasks?',
      options: ['RNN', 'CNN', 'SVM', 'Decision Tree'],
      correctAnswer: 'CNN',
      education: "Master's"
    },
    {
      id: 'edu18',
      text: 'What is the purpose of containerization tools like Kubernetes?',
      options: ['To scale applications dynamically', 'To build machine learning models', 'To automate testing', 'To debug code'],
      correctAnswer: 'To scale applications dynamically',
      education: "Master's"
    },
    {
      id: 'edu19',
      text: 'Which database type is best suited for handling unstructured data?',
      options: ['Relational', 'NoSQL', 'Graph', 'Flat File'],
      correctAnswer: 'NoSQL',
      education: "Master's"
    },
    {
      id: 'edu20',
      text: 'What is the significance of MapReduce in distributed systems?',
      options: ['Data Encryption', 'Parallel Data Processing', 'Real-Time Analytics', 'Data Visualization'],
      correctAnswer: 'Parallel Data Processing',
      education: "Master's"
    }
  ],
  "PhD": [
    {
      id: 'edu21',
      text: 'What is the main goal of conducting a PhD in computer science?',
      options: ['Job Placement', 'Contributing to Original Research', 'Building Startups', 'Learning Coding Skills'],
      correctAnswer: 'Contributing to Original Research',
      education: "PhD"
    },
    {
      id: 'edu22',
      text: 'What is the purpose of a literature review in a PhD dissertation?',
      options: ['Analyze existing work', 'Build new projects', 'Find errors in prior research', 'Summarize one article only'],
      correctAnswer: 'Analyze existing work',
      education: "PhD"
    },
    {
      id: 'edu23',
      text: 'Which machine learning model is most effective for time-series prediction?',
      options: ['CNN', 'RNN', 'KNN', 'Random Forest'],
      correctAnswer: 'RNN',
      education: "PhD"
    },
    {
      id: 'edu24',
      text: 'What is the primary use of graph databases in research?',
      options: ['Data Encryption', 'Modeling Relationships', 'Image Processing', 'Statistical Analysis'],
      correctAnswer: 'Modeling Relationships',
      education: "PhD"
    },
    {
      id: 'edu25',
      text: 'What is the primary focus of optimization algorithms in research?',
      options: ['Improving model interpretability', 'Minimizing error functions', 'Creating visualizations', 'Debugging errors'],
      correctAnswer: 'Minimizing error functions',
      education: "PhD"
    },
    {
      id: 'edu26',
      text: 'What is the importance of reproducibility in academic research?',
      options: ['To achieve high accuracy', 'To validate results', 'To reduce computing costs', 'To simplify models'],
      correctAnswer: 'To validate results',
      education: "PhD"
    },
    {
      id: 'edu27',
      text: 'Which field heavily relies on quantum computing research today?',
      options: ['Social Media Analytics', 'Cryptography', 'Frontend Development', 'SEO'],
      correctAnswer: 'Cryptography',
      education: "PhD"
    },
    {
      id: 'edu28',
      text: 'What statistical test is most used for hypothesis validation in research?',
      options: ['Chi-Square Test', 'ANOVA', 'T-Test', 'Z-Test'],
      correctAnswer: 'T-Test',
      education: "PhD"
    },
    {
      id: 'edu29',
      text: 'Which tool is widely used for managing citations in academic research?',
      options: ['MATLAB', 'LaTeX', 'Zotero', 'Excel'],
      correctAnswer: 'Zotero',
      education: "PhD"
    },
    {
      id: 'edu30',
      text: 'What is the benefit of open-access journals in research?',
      options: ['Higher subscription costs', 'Free and wide dissemination of knowledge', 'Exclusive reader access', 'None of the above'],
      correctAnswer: 'Free and wide dissemination of knowledge',
      education: "PhD"
    }
  ]
};
