# Marketplace

Checkout our demo here: https://drive.google.com/file/d/1GA4wFLw_X3WsdWV64SGUBNKIX_-7l0TI/view?usp=sharing

## Idea Inspiration
Every semester, students move in and out, often selling their belongings through various social media chats. Meanwhile, new students have similar needs for these items. However, tracking these exchanges across multiple chat threads can be overwhelming. To streamline this process, we created a platform where users can list items for sale, and other users can easily show interest in purchasing. This will simplify transactions, making it more efficient for both sellers and buyers.

## Application Architecture
  

## Application Features
1. Login and Registration: A user should be able to log in and register into the application.
2. Users should be able to view the products without logging in.
3. The ability of the user to filter based on the categories.
4. Search feature so the user can view the products he/she is looking for.
5. Login and Logout features.
6. After logging in, with a single click, the user should be able to show interest in a particular product and a message should be sent to the seller.
    1. A messaging system is in place so buyers and sellers communicate on the same platform.
    2. Users should be able to view notifications related to the products they are interested in.
7. Scaling the backend server based on the user's load using Kubernetes.

Hardware and Software Components
1. React for frontend development: We chose this as it is very flexible and extensible to mobile applications. It has great performance and is easy to test.
a. Hosted react app in google app engine: There are many benefits of using Google App Engine as it provides logs and backend infrastructure is taken care of by Google.
2. Django for backend development: Main goal to choose this is because of its simplicity. It is also flexible, scalable, and reliable. There are many out-of-the-box features in it, so we can avoid reinventing the wheel and focus on the development of the application.
a. Kubernetes and Containerization: Used GKE to deploy the backend application. The main reason to use Kubernetes is to scale the application on demand.
3. Primary database: Sqlite in the development phase and Postgres for production. Django uses ORM hence we can flexibly switch between databases. Chose Postgres for production due to its performance and high availability.
a. Deployed Postgres in Cloud SQL engine.
4. Secondary databases: As the products can increase drastically, we are storing the images
in google cloud storage. And users can view the images provided by Google. Given they are viewing it from the application. The authentication for the images is handled in the backend service.
a. Probably should have also used Redis for caching so the request is processed
5. Load balancer: Used google service load balancing, so the service is highly available.
6. Message marshaling: All the communication is done using JSON. Each request is
serialized and deserialized to JSON and internal data structure.
7. REST APIs: Rest APIs are exposed by Django, which is utilized by the front end to
communicate with the backend server.
