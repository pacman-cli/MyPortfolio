package com.portfolio.backend.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.portfolio.backend.model.Blog;
import com.portfolio.backend.repository.BlogRepository;

@Component
public class DataSeeder implements CommandLineRunner {

  private final BlogRepository blogRepository;

  public DataSeeder(BlogRepository blogRepository) {
    this.blogRepository = blogRepository;
  }

  @Override
  public void run(String... args) throws Exception {
    if (blogRepository.count() == 0) {
      seedBlogs();
    }
  }

  private void seedBlogs() {
    List<Blog> blogs = Arrays.asList(
        createBlog(
            "Building Scalable Microservices with Spring Boot",
            "microservices-spring-boot",
            "Learn how to design and implement resilient microservices using Spring Boot, Spring Cloud, and Docker.",
            "## Introduction\n\nMicroservices architecture has become the de facto standard for building scalable, resilient, and maintainable applications. In this comprehensive guide, we'll explore how to leverage the power of **Spring Boot** and **Spring Cloud** to build a robust microservices ecosystem.\n\n### Why Microservices?\n\nMonolithic applications, while easier to start with, often become difficult to maintain and scale as they grow. Microservices offer:\n\n- **Scalability**: Scale individual components based on demand.\n- **Resilience**: Failure in one service doesn't bring down the entire system.\n- **Technology Agnosticism**: Use the best tool for each job.\n\n### Key Components\n\n1. **Service Discovery** (Eureka)\n2. **API Gateway** (Spring Cloud Gateway)\n3. **Centralized Configuration** (Spring Cloud Config)\n4. **Circuit Breakers** (Resilience4j)\n\nStay tuned for the next part where we dive into code!",
            "Microservices, Spring Boot, Java, Architecture"),
        createBlog(
            "Mastering React Hooks: A Comprehensive Guide",
            "mastering-react-hooks",
            "A deep dive into React Hooks, from useState and useEffect to custom hooks for complex logic reuse.",
            "## The Revolution of Hooks\n\nIntroduced in React 16.8, Hooks changed the way we write React components forever. They allow us to use state and other React features without writing a class.\n\n### Essential Hooks\n\n- `useState`: Manage local component state.\n- `useEffect`: Handle side effects like data fetching and subscriptions.\n- `useContext`: Share global data without prop drilling.\n\n### Creating Custom Hooks\n\nOne of the most powerful features of Hooks is the ability to extract component logic into reusable functions.\n\n```javascript\nfunction useWindowSize() {\n  const [size, setSize] = useState([0, 0]);\n  useLayoutEffect(() => {\n    function updateSize() {\n      setSize([window.innerWidth, window.innerHeight]);\n    }\n    window.addEventListener('resize', updateSize);\n    updateSize();\n    return () => window.removeEventListener('resize', updateSize);\n  }, []);\n  return size;\n}\n```",
            "React, Frontend, JavaScript, Web Development"),
        createBlog(
            "Optimizing Database Performance in Java Applications",
            "optimizing-db-performance-java",
            "Best practices for Hibernate, connection pooling, and query optimization to ensure your Java app runs smoothly.",
            "## Performance Matters\n\nDatabase interactions are often the bottleneck in enterprise applications. Let's explore strategies to optimize them.\n\n### 1. N+1 Problem\n\nThe N+1 select problem is a common performance antipattern. It happens when data is accessed in a way that causes N additional SQL statements to be executed to fetch the same data that could have been retrieved when executing the primary SQL query.\n\n**Solution**: Use `JOIN FETCH` in JPQL or Entity Graphs.\n\n### 2. Connection Pooling\n\nUsing a robust connection pool like **HikariCP** (default in Spring Boot 2.x+) is crucial. Properly configuring `maximumPoolSize` can drastically improve throughput.\n\n### 3. Indexing\n\nEnsure your database tables are properly indexed based on query patterns. Analyze execution plans using `EXPLAIN ANALYZE`.",
            "Java, Database, SQL, Performance, Hibernate"));

    blogRepository.saveAll(blogs);
    System.out.println("✅ Seeded " + blogs.size() + " initial blogs.");
  }

  private Blog createBlog(String title, String slug, String excerpt, String content, String tags) {
    Blog blog = new Blog();
    blog.setTitle(title);
    blog.setSlug(slug);
    blog.setExcerpt(excerpt);
    blog.setContent(content);
    blog.setTags(tags);
    return blog;
  }
}
