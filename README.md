# wanted-pre-onboarding-backend

## 과제안내

- 아래 서비스 개요 및 요구사항을 만족하는 API 서버를 구현합니다.
- 사용가능 언어 및 프레임워크:
  - Javascript & Node.js
  - Python & Django(DRF 권장)
  - Java & Spring
  - 중 택 1

※ 본 과제 수행 프레임워크는 추후 코스 팀 구성에 활용 됩니다. 참고하시고 코스수행을 희망하는 프레임 워크 선정 바랍니다.

## 서비스 개요

- 본 서비스는 기업의 채용을 위한 웹 서비스 입니다.
- 회사는 채용공고를 생성하고, 이에 사용자는 지원합니다

## TODO

- [ ] API
  - [x] 채용공고 등록 `/job-posting POST`
  - [x] 채용공고 수정 `/job-posting/:id PATCH`
    - 회사 ID를 제외하고 수정 가능
  - [x] 채용공고 삭제 `/job-posting/:id DELETE`
  - [x] 채용공고 목록 조회
    - [x] 전체 조회 `/job-posting GET`
    - [x] 검색 조회(선택) `/job-posting?search=원티드 GET`
  - [x] 공고 상세 조회 `/job-posting/:id GET`
    - [x] 같은 회사의 다른 채용 공고(선택)
  - [x] 사용자가 채용공고 지원(선택) `/application POST`
    - [x] 사용자는 1회만 지원 가능

## 실행 환경

- `.env` 추가

  ```
  DATABASE_NAME=
  DATABASE_USERNAME=
  DATABASE_PASSWORD=
  ```

- 실행

  ```
  npm run start
  ```

## ERD

![ERD](https://github.com/user-attachments/assets/f91f5e78-b189-44db-a3b7-7cd89ec1b76e)

## 프로젝트 구조

```
.
├── README.md
├── nest-cli.json
├── package-lock.json
├── package.json
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── applications
│   │   ├── application.repository.ts
│   │   ├── applications.controller.spec.ts
│   │   ├── applications.controller.ts
│   │   ├── applications.module.ts
│   │   ├── applications.service.spec.ts
│   │   ├── applications.service.ts
│   │   └── dto
│   │       └── create-application.dto.ts
│   ├── companies
│   │   ├── companies.controller.spec.ts
│   │   ├── companies.controller.ts
│   │   ├── companies.module.ts
│   │   ├── companies.repository.ts
│   │   ├── companies.service.spec.ts
│   │   ├── companies.service.ts
│   │   └── dto
│   │       └── create-company.ts
│   ├── db
│   │   ├── data-source.ts
│   │   └── migrations
│   │       ├── 1722776144234-Migration.ts
│   │       └── 1722779693367-Migration.ts
│   ├── entities
│   │   ├── application.entity.ts
│   │   ├── company.entity.ts
│   │   ├── job-posting.entity.ts
│   │   └── user.entity.ts
│   ├── job-postings
│   │   ├── dto
│   │   │   ├── create-job-posting.dto.ts
│   │   │   └── update-job-posting.dto.ts
│   │   ├── job-postings.controller.spec.ts
│   │   ├── job-postings.controller.ts
│   │   ├── job-postings.module.ts
│   │   ├── job-postings.repository.ts
│   │   ├── job-postings.service.spec.ts
│   │   └── job-postings.service.ts
│   ├── main.ts
│   └── users
│       ├── users.controller.spec.ts
│       ├── users.controller.ts
│       ├── users.module.ts
│       ├── users.repository.ts
│       ├── users.service.spec.ts
│       └── users.service.ts
├── test
│   ├── app.e2e-spec.ts
│   ├── jest-e2e.json
│   └── testing-utils
│       └── mock.ts
├── tsconfig.build.json
└── tsconfig.json

14 directories, 49 files
```

## API 명세

### 채용공고 등록

- Request

  - URL: `/job-postings POST`
  - Body:

    ```json
    {
      "position": "Frontend Developer",
      "description": "Frontend Developer 상세",
      "stack": "React",
      "reward": 1000000,
      "companyId": 3
    }
    ```

- Response

  - Success

    ```json
    {
      "position": "Frontend Developer",
      "description": "Frontend Developer 상세",
      "stack": "React",
      "reward": 1000000,
      "companyId": 3,
      "id": 12,
      "createdAt": "2024-08-04T10:30:52.778Z",
      "updatedAt": "2024-08-04T10:30:52.778Z"
    }
    ```

  - Fail

    - 존재하지 않은 회사

      ```json
      {
        "message": "Company with 999 not found",
        "error": "Not Found",
        "statusCode": 404
      }
      ```

### 채용공고 수정

- Request

  - URL: `/job-postings/:id PATCH`
  - Body:

    ```json
    {
      "position": "Frontend Developer",
      "description": "Frontend Developer 상세",
      "stack": "React",
      "reward": 1000000
    }
    ```

- Response

  - Success

    ```json
    {
      "id": 3,
      "position": "Frontend Developer",
      "description": "Frontend Developer 상세",
      "stack": "React",
      "reward": 2000000,
      "companyId": 1,
      "createdAt": "2024-08-03T12:19:06.414Z",
      "updatedAt": "2024-08-03T12:27:21.000Z"
    }
    ```

  - Fail

    - 존재하지 않는 공고

      ```json
      {
        "message": "Job Posting with 999 not found",
        "error": "Not Found",
        "statusCode": 404
      }
      ```

    - 올바르지 않은 요청

      ```json
      {
        "message": ["property companyId should not exist"],
        "error": "Bad Request",
        "statusCode": 400
      }
      ```

### 채용공고 삭제

- Request

  - URL: `/job-postings/:id DELETE`

- Response

  - Success

    ```json
    {
      "userId": 1,
      "jobPostingId": 5,
      "id": 7,
      "createdAt": "2024-08-04T13:06:55.623Z",
      "updatedAt": "2024-08-04T13:06:55.623Z"
    }
    ```

  - Fail

    - 존재하지 않는 유저

      ```json
      {
        "message": "user not found",
        "error": "Not Found",
        "statusCode": 404
      }
      ```

    - 존재하지 않는 공고

      ```json
      {
        "message": "Job Posting with 4 not found",
        "error": "Not Found",
        "statusCode": 404
      }
      ```

### 채용공고 목록 조회

- Request

  - URL: `/job-postings GET`

- Response

  - Success

    ```json
    [
      {
        "id": 5,
        "companyName": "Test Company",
        "nation": "Korea",
        "city": "Seoul",
        "position": "test position",
        "reward": 1000000,
        "stack": "react"
      },
      {
        "id": 6,
        "companyName": "Test Company",
        "nation": "Korea",
        "city": "Seoul",
        "position": "test position",
        "reward": 1000000,
        "stack": "react"
      }
    ]
    ```

### 채용공고 검색

- Request

  - URL: `/job-postings?search=developer GET`

- Response

  - Success

    ```json
    [
      {
        "id": 12,
        "companyName": "3 Company",
        "nation": "Korea",
        "city": "Seoul",
        "position": "Frontend Developer",
        "reward": 1000000,
        "stack": "React"
      }
    ]
    ```

### 채용공고 상세 조회

- Request

  - URL: `/job-postings/:id GET`

- Response

  - Success

    ```json
    {
      "id": 16,
      "companyName": "3 Company",
      "nation": "Korea",
      "city": "Seoul",
      "position": "Frontend Developer",
      "reward": 1000000,
      "stack": "React",
      "description": "Frontend Developer 상세",
      "otherJobPostings": [9, 10, 11, 12, 16]
    }
    ```

  - Fail

    - 존재하지 않는 공고

      ```json
      {
        "message": "job posting not found",
        "error": "Not Found",
        "statusCode": 404
      }
      ```

### 채용공고 지원

- Request

  - URL: `/application POST`
  - Body:

    ```json
    {
      "userId": 1,
      "jobPostingId": 5
    }
    ```

- Response

  - Success

    ```json
    {
      "userId": 2,
      "jobPostingId": 16,
      "id": 10,
      "createdAt": "2024-08-04T13:35:39.941Z",
      "updatedAt": "2024-08-04T13:35:39.941Z"
    }
    ```

  - Fail

    - 존재하지 않는 유저

      ```json
      {
        "message": "user not found",
        "error": "Not Found",
        "statusCode": 404
      }
      ```

    - 존재하지 않는 공고

      ```json
      {
        "message": "Job Posting with 4 not found",
        "error": "Not Found",
        "statusCode": 404
      }
      ```

    - 지원은 공고당 1회만 가능

      ```json
      {
        "message": "already applied job posting",
        "error": "Conflict",
        "statusCode": 409
      }
      ```
