<p align="center">
Provides an extension on your HTTP services which interfaces with API's using the <a href="https://github.com/MartinDrost/nest-utilities">nest-utilities</a> package.
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/nest-utilities-client"><img src="https://img.shields.io/npm/dt/nest-utilities-client.svg" alt="NPM Downloads" /></a>
  <a href="https://www.npmjs.com/package/nest-utilities-client"><img src="https://img.shields.io/npm/v/nest-utilities-client.svg" alt="NPM Version" /></a>
</p>

## Basic usage

The package revolves around the `CrudService`. Extending this service will grant you methods to call upon the [endpoints](https://github.com/MartinDrost/nest-utilities/wiki/Controller-abstract) generated by nest-utilities as well as the available [query parameters](https://github.com/MartinDrost/nest-utilities/wiki/Query-parameters).

```Typescript
import { CrudService } from "nest-utilities-client";
import { IUser } from "../interfaces"

class UserService extends CrudService<IUser> {
  constructor() {
    super("http://localhost:3000/users");
  }
}

```

## HTTP service

Out of the box the `CrudService` will supplement your extended class with a basic HTTP service to execute your calls. In a lot of cases you'll want to create generic error handlers and define headers to send along with your requests.

You can customize the HTTP service by creating a new class which extends the HTTP service offered by the package. In this new class you will be prompted to implement abstract methods which help you tailor the service with ease.

```Typescript
import { HttpService } from "nest-utilities-client";
import { messageService } from "../services";

class CustomHttpService extends HttpService {
  getHeaders(url: string, init: RequestInit) {
    return {
      "Authorization": localStorage.session
    };
  }

  onRequestError(error: Error) {
    messageService.notify(error.message);
  }
}

```

```Typescript
import { CrudService } from "nest-utilities-client";
import { CustomHttpService } from "../services";
import { IUser } from "../interfaces"

class UserService extends CrudService<IUser> {
  constructor() {
    super("http://localhost:3000/users", new CustomHttpService());
  }
}
```
