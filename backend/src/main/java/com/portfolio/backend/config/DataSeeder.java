package com.portfolio.backend.config;

import com.portfolio.backend.model.Blog;
import com.portfolio.backend.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

        private final BlogRepository blogRepository;

        @Bean
        public CommandLineRunner seedDatabase() {
                return args -> {
                        seedBlog(
                                        "Mastering Spring Boot: A Backend Guide",
                                        "mastering-spring-boot",
                                        "Dive deep into the architecture of Spring Boot microservices and how to build scalable APIs.",
                                        "# Mastering Spring Boot\n\nSpring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can \"just run\".\n\n## Why Spring Boot?\n\n- Standalone\n- Opinionated\n- Production Ready\n\nIn this guide, we explore the core components...",
                                        "Spring Boot,Java,Backend",
                                        LocalDateTime.now().minusDays(2));

                        seedBlog(
                                        "Building Secure APIs with JWT",
                                        "building-secure-apis-jwt",
                                        "Learn how to secure your REST endpoints using JSON Web Tokens (JWT) and Spring Security.",
                                        "# Secure APIs with JWT\n\nSecurity is paramount in modern web applications. JWT provides a stateless authentication mechanism.\n\n## Implementation Steps\n\n1. Add Dependencies\n2. Configure Security Filter\n3. Generate Tokens\n\n...",
                                        "Security,JWT,Spring",
                                        LocalDateTime.now().minusDays(5));

                        seedBlog(
                                        "Next.js 14: The Future of Frontend",
                                        "nextjs-14-guide",
                                        "Exploring the App Router, Server Actions, and the paradigm shift in React development.",
                                        "# Next.js 14\n\nThe App Router is a game changer. It allows for nested layouts, loading states, and error handling.\n\n## Server Components\n\nReact Server Components allow you to write UI that can be rendered and optionally cached on the server.",
                                        "Next.js,React,Frontend",
                                        LocalDateTime.now().minusDays(1));

                        seedBlog(
                                        "What is @AuthenticationPrincipal in Spring Security?",
                                        "what-is-authentication-principal",
                                        "Master Spring Security: Directly access the logged-in user in controllers using @AuthenticationPrincipal.",
                                        "# 1️⃣ What is `@AuthenticationPrincipal`?\n\n`@AuthenticationPrincipal` is a **Spring Security annotation** used to **directly access the currently logged-in user** inside a controller method.\n\n👉 It extracts the **principal** from the **SecurityContext**.\n\n---\n\n## 🔹 What is a Principal?\n\nIn Spring Security:\n\n```\nPrincipal = currently authenticated user\n\n```\n\nUsually, this principal is:\n\n- `UserDetails`\n- or your custom `CustomUserDetails`\n\n---\n\n# 2️⃣ Why do we use `@AuthenticationPrincipal`?\n\nWithout it ❌:\n\n```java\nAuthentication auth =\n    SecurityContextHolder.getContext().getAuthentication();\n\nCustomUserDetails user =\n    (CustomUserDetails) auth.getPrincipal();\n\n```\n\nWith it ✅:\n\n```java\n@AuthenticationPrincipal CustomUserDetails user\n\n```\n\n👉 Cleaner, safer, readable code.\n\n---\n\n# 3️⃣ When is it useful? (Real Use Cases)\n\n- Get **current user ID**\n- Save data **linked to logged-in user**\n- Avoid passing userId in request (security)\n- Role-based behavior\n\n---\n\n# 4️⃣ Example Setup (Quick Recap)\n\n### CustomUserDetails\n\n```java\npublic class CustomUserDetails implements UserDetails {\n\n    private User user;\n\n    public Long getId() {\n        return user.getId();\n    }\n\n    public String getEmail() {\n        return user.getEmail();\n    }\n}\n\n```\n\n---\n\n# 5️⃣ Basic Example\n\n## ❌ Bad Way (Insecure)\n\n```java\n@PostMapping(\"/post\")\npublic Post createPost(@RequestParam Long userId,\n                       @RequestBody Post post) {\n    // Anyone can send someone else's userId 😨\n}\n\n```\n\n---\n\n## ✅ Correct Way Using `@AuthenticationPrincipal`\n\n```java\n@PostMapping(\"/post\")\npublic Post createPost(\n        @AuthenticationPrincipal CustomUserDetails userDetails,\n        @RequestBody Post post) {\n\n    post.setUserId(userDetails.getId());\n    return postRepository.save(post);\n}\n\n```\n\n✔ Secure\n\n✔ Clean\n\n✔ No userId from client\n\n---\n\n# 6️⃣ Example: Get Logged-in User Profile\n\n```java\n@GetMapping(\"/me\")\npublic UserProfile getProfile(\n        @AuthenticationPrincipal CustomUserDetails user) {\n\n    return userService.getProfile(user.getId());\n}\n\n```\n\n### API Call:\n\n```\nGET /me\nAuthorization: Bearer <JWT>\n\n```\n\n---\n\n# 7️⃣ Example with `UserDetails` (Default)\n\n```java\n@GetMapping(\"/username\")\npublic String username(\n        @AuthenticationPrincipal UserDetails userDetails) {\n\n    return userDetails.getUsername();\n}\n\n```\n\n---\n\n# 8️⃣ Using with JWT Authentication\n\nWhen JWT filter sets authentication:\n\n```java\nSecurityContextHolder.getContext()\n    .setAuthentication(authentication);\n\n```\n\nSpring automatically makes:\n\n```\nauthentication.getPrincipal()\n\n```\n\navailable via:\n\n```java\n@AuthenticationPrincipal\n\n```\n\n✔ Works perfectly with JWT\n\n---\n\n# 9️⃣ Difference: `Principal` vs `@AuthenticationPrincipal`\n\n### Using `Principal`\n\n```java\n@GetMapping(\"/me\")\npublic String me(Principal principal) {\n    return principal.getName();\n}\n\n```\n\n❌ Only username\n\n❌ No roles, no ID\n\n---\n\n### Using `@AuthenticationPrincipal`\n\n```java\n@GetMapping(\"/me\")\npublic CustomUserDetails me(\n        @AuthenticationPrincipal CustomUserDetails user) {\n    return user;\n}\n\n```\n\n✅ Full user object\n\n✅ Roles, ID, email\n\n---\n\n# 🔟 Example: Role-based Logic\n\n```java\n@GetMapping(\"/dashboard\")\npublic String dashboard(\n        @AuthenticationPrincipal CustomUserDetails user) {\n\n    if (user.getAuthorities().contains(\n            new SimpleGrantedAuthority(\"ROLE_ADMIN\"))) {\n        return \"Admin Dashboard\";\n    }\n    return \"User Dashboard\";\n}\n\n```\n\n# 1️⃣ How `@AuthenticationPrincipal` Works Internally\n\n### What happens behind the scenes?\n\n1. **JWT / Login filter authenticates user**\n2. Authentication object is created\n3. It is stored in **SecurityContext**\n4. `@AuthenticationPrincipal` extracts:\n    \n    ```\n    SecurityContextHolder\n       → Authentication\n          → Principal\n    \n    ```\n    \n\n---\n\n### Equivalent manual code\n\n```java\nAuthentication authentication =\n    SecurityContextHolder.getContext().getAuthentication();\n\nObject principal = authentication.getPrincipal();\n\n```\n\n`@AuthenticationPrincipal` = **syntactic sugar** for this 👆\n\n---\n\n# 2️⃣ Internal Spring Flow (Important)\n\n```\nHTTP Request\n   ↓\nSecurity Filter Chain\n   ↓\nAuthentication Filter (JWT / UsernamePassword)\n   ↓\nSecurityContextHolder populated\n   ↓\nController\n   ↓\n@AuthenticationPrincipal resolves principal\n\n```\n\n---\n\n# 3️⃣ When `@AuthenticationPrincipal` Will Be `null`\n\nVery important to know ❗\n\n| Case | Reason |\n| --- | --- |\n| Public endpoint | No authentication |\n| Missing JWT | Principal not set |\n| Invalid token | Authentication fails |\n| Anonymous user | Principal = \"anonymousUser\" |\n\n---\n\n### Safe Usage\n\n```java\n@GetMapping(\"/me\")\npublic String me(@AuthenticationPrincipal CustomUserDetails user) {\n    if (user == null) {\n        return \"Not logged in\";\n    }\n    return user.getUsername();\n}\n\n```\n\n---\n\n# 4️⃣ Custom Annotation: `@CurrentUser` (Clean Code)\n\nInstead of repeating:\n\n```java\n@AuthenticationPrincipal CustomUserDetails user\n\n```\n\nCreate a custom annotation.\n\n---\n\n## Step 1️⃣ Create Annotation\n\n```java\n@Target(ElementType.PARAMETER)\n@Retention(RetentionPolicy.RUNTIME)\n@AuthenticationPrincipal\npublic @interface CurrentUser {\n}\n\n```\n\n---\n\n## Step 2️⃣ Use It\n\n```java\n@GetMapping(\"/me\")\npublic UserProfile me(@CurrentUser CustomUserDetails user) {\n    return userService.getProfile(user.getId());\n}\n\n```\n\n✔ Cleaner\n\n✔ Professional\n\n✔ Real-world practice\n\n---\n\n# 5️⃣ Using `expression` in `@AuthenticationPrincipal`\n\nYou can extract **specific fields**.\n\n---\n\n### Example: Get User ID Only\n\n```java\n@GetMapping(\"/id\")\npublic Long getId(\n    @AuthenticationPrincipal(expression = \"id\") Long userId) {\n\n    return userId;\n}\n\n```\n\n---\n\n### Example: Get Email\n\n```java\n@AuthenticationPrincipal(expression = \"email\") String email\n\n```\n\n✔ No casting\n\n✔ Clean API\n\n---\n\n# 6️⃣ Use Case: Auditing (CreatedBy / UpdatedBy)\n\n```java\n@PostMapping(\"/post\")\npublic Post createPost(\n        @CurrentUser CustomUserDetails user,\n        @RequestBody Post post) {\n\n    post.setCreatedBy(user.getId());\n    return postRepository.save(post);\n}\n\n```\n\n🔐 Prevents client manipulation\n\n---\n\n# 7️⃣ Best Practices (🔥 Important)\n\n✅ Do NOT accept `userId` from client\n\n✅ Always use `@AuthenticationPrincipal`\n\n✅ Wrap it with custom annotation\n\n✅ Keep principal lightweight\n\n✅ Handle null safely\n\n---\n\n# 8️⃣ Common Interview Traps\n\n### ❓ Difference between `Principal` and `AuthenticationPrincipal`\n\n| Principal | AuthenticationPrincipal |\n| --- | --- |\n| Interface | Annotation |\n| Only name | Full object |\n| Limited | Flexible |\n\n---\n\n### ❓ Can we use it in Service layer?\n\n❌ No\n\n✔ Controller only\n\n(SecurityContext is web-layer responsibility)\n\n---\n\n# 9️⃣ Real Project Example\n\n```java\n@RestController\n@RequestMapping(\"/api\")\npublic class OrderController {\n\n    @PostMapping(\"/orders\")\n    public Order placeOrder(\n            @CurrentUser CustomUserDetails user,\n            @RequestBody OrderRequest request) {\n\n        return orderService.createOrder(user.getId(), request);\n    }\n}\n```",
                                        "Spring Security,Java,Authentication",
                                        LocalDateTime.now());
                };
        }

        private void seedBlog(String title, String slug, String excerpt, String content, String tags,
                        LocalDateTime publishedAt) {
                if (blogRepository.findBySlug(slug).isPresent()) {
                        return;
                }
                Blog blog = new Blog();
                blog.setTitle(title);
                blog.setSlug(slug);
                blog.setExcerpt(excerpt);
                blog.setContent(content);
                blog.setTags(tags);
                blog.setPublishedAt(publishedAt);
                blogRepository.save(blog);
                System.out.println("✅ Seeded blog: " + title);
        }
}
