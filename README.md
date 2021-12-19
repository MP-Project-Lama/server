# Server / Backend
# Masterpiece-Project

## User Story: 
- *signe up* : As an anon you can sign up in the platform so that you can navigate through the app . 
- *Verification* : as a new user ,you will resave an Email with verification Code/Link  , after enter the code/ press the link , you will active your account 

- *Login* : as long as you have an actived account you can login by enter your email/username , and your password . 

- *Login With Google* : user can login by his Gmail account
- *User Profile* : user can edit his information in profile page , like reset his avatar , reset his password , edit first / last name ...etc 

###### Blog Page
- *Add Comments* : in blog page , user can comment on posts .
- *Edit Comments* : also, user can edit his own comments . 
- *Delete Comments* :  user can remove his own comments as well . 
- *Add Likes* : in blog page , user can favorite posts .
- *Unlike* :  user can remove his likes .


###### Designers page 

- *Chatting With Designers* : user can contact with designers in a direct message . 



# Entity Relationship Diagram (ERD)

![erd](./diagrams/erd.png)


# UML Diagram 

![uml](./diagrams/uml.png)


## Models 

###### Roles 

| Key               | Type              |       Options               |      Default value      |               
| :---              |     :---:         |        :---:                |        :---:            |
| _id               |     String        |      required, unique       |         n/a             |
| role              |     String        |      required, unique       |         n/a             |



###### users

| Key               | Type              |       Options               |      Default value      |               
| :---              |     :---:         |        :---:                |        :---:            |
| _id               |     String        |      required, unique       |         n/a             |
| email             |     String        |      required, unique       |         n/a             |
| username          |     String        |      required, unique       |         n/a             |
| password          |     String        |      required               |         n/a             |
| isActive          |     Boolean       |                             |         false           |
| isDel             |     Boolean       |                             |        false            |
| role              |     Ref(role)     |      required               |         n/a             |
| avatar            |     String        |                             |         n/a             |



###### Posts

| Key               | Type              |       Options               |      Default value      |               
| :---              |     :---:         |        :---:                |        :---:            |
| _id               |     String        |      required, unique       |         n/a             |
| title             |     String        |      required               |         n/a             |
| desc              |     String        |      required               |         n/a             |
| media             |     Array         |                             |         n/a             |
| createdBy         |     Ref(user)     |                             |         n/a             |
| createdAt         |     Date          |                             |         n/a             |
| isDel             |     Boolean       |                             |         false           |



###### Comments

| Key               | Type              |       Options               |      Default value      |               
| :---              |     :---:         |        :---:                |        :---:            |
| _id               |     String        |      required, unique       |         n/a             |
| comment           |     String        |      required               |         n/a             |
| createdBy         |     Ref(user)     |                             |         n/a             |
| createdAt         |     Date          |                             |         n/a             |
| post              |     Ref(post)     |                             |         n/a             |
| isDel             |     Boolean       |                             |         false           |


###### likes

| Key               | Type              |       Options               |      Default value      |               
| :---              |     :---:         |        :---:                |        :---:            |
| _id               |     String        |      required, unique       |         n/a             |
| like              |     Boolean       |      required               |         false           |
| createdBy         |     Ref(user)     |                             |         n/a             |
| post              |     Ref(post)     |                             |         n/a             |
| isDel             |     Boolean       |                             |         false           |


###### Designs


| Key               | Type              |       Options               |      Default value      |               
| :---              |     :---:         |        :---:                |        :---:            |
| _id               |     String        |      required, unique       |         n/a             |
| title             |     String        |      required               |         n/a             |
| desc              |     String        |      required               |         n/a             |
| media             |     Array         |      required               |         n/a             |
| caregory          |     String        |      required               |         n/a             |
| material          |     String        |      required               |         n/a             |
| createdBy         |     Ref(user)     |                             |         n/a             |
| createdAt         |     Date          |                             |         n/a             |
| isDel             |     Boolean       |                             |         false           |





# Links

#### Trello 
You can visit my Trello [Here](https://trello.com/b/v5XlqqjM/mp-project-lama)

#### Git
- [Client repository Link](https://github.com/MP-Project-Lama/client)
- [Server repository Link](https://github.com/MP-Project-Lama/server)
- [Deployed App Link ](https://github.com/MP-Project-Lama/server)

#### Slides
 You can display my presentation slides [Here](https://github.com/MP-Project-Lama/server)
