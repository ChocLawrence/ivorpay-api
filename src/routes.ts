import { body, param } from "express-validator";
import { UserController } from "./controller/UserController";
import { RoleController } from "./controller/RoleController";
import { StatusController } from "./controller/StatusController";
import { TransactionTypeController } from "./controller/TransactionTypeController";
import { TransactionController } from "./controller/TransactionController";
import { WalletController } from "./controller/WalletController";

export const Routes = [
 //USER
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    validation: [],
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
    validation: [param("id").isInt()],
  },
  {
    method: "get",
    route: "/users/ver/:username",
    controller: UserController,
    action: "verify",
    validation: [param("username").isString()],
  },
  {
    method: "post",
    route: "/register",
    controller: UserController,
    action: "register",
    validation: [
      body("username").isString(),
      body("firstname").isString(),
      //body("middlename").isString(),
      body("lastname").isString(),
     // body("dob").isISO8601(),
      body("email").isEmail(),
      body("pass").isString(),
      body("gender").isIn(['male', 'female']),
    ],
  },
  {
    method: "post",
    route: "/login",
    controller: UserController,
    action: "login",
    validation: [
      body("username").isString(),
      body("password").isString(),
    ],
  },
  {
    method: "post",
    route: "/logout",
    controller: UserController,
    action: "logout",
    validation: [],
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
    validation: [param("id").isInt()],
  },
   //ROLE
   {
    method: "get",
    route: "/roles",
    controller: RoleController,
    action: "all",
    validation: [],
  },
  {
    method: "get",
    route: "/roles/:id",
    controller: RoleController,
    action: "one",
    validation: [param("id").isInt()],
  },
  {
    method: "post",
    route: "/roles",
    controller: RoleController,
    action: "save",
    validation: [
      body("roleName").isString()
    ],
  },
  {
    method: "delete",
    route: "/roles/:id",
    controller: RoleController,
    action: "remove",
    validation: [param("id").isInt()],
  },
  //STATUS
  {
    method: "get",
    route: "/statuses",
    controller: StatusController,
    action: "all",
    validation: [],
  },
  {
    method: "get",
    route: "/statuses/:id",
    controller: StatusController,
    action: "one",
    validation: [param("id").isInt()],
  },
  {
    method: "post",
    route: "/statuses",
    controller: StatusController,
    action: "save",
    validation: [
      body("statusName").isString()
    ],
  },
  {
    method: "delete",
    route: "/statuses/:id",
    controller: StatusController,
    action: "remove",
    validation: [param("id").isInt()],
  },
  //TRANSACTION TYPES
  {
    method: "get",
    route: "/transactiontypes",
    controller: TransactionTypeController,
    action: "all",
    validation: [],
  },
  {
    method: "get",
    route: "/transactiontypes/:id",
    controller: TransactionTypeController,
    action: "one",
    validation: [param("id").isInt()],
  },
  {
    method: "post",
    route: "/transactiontypes",
    controller: TransactionTypeController,
    action: "save",
    validation: [
      body("transactionTypeName").isString()
    ],
  },
  {
    method: "delete",
    route: "/transactiontypes/:id",
    controller: TransactionTypeController,
    action: "remove",
    validation: [param("id").isInt()],
  },
  //WALLETS
  {
    method: "get",
    route: "/wallets",
    controller: WalletController,
    action: "all",
    validation: [],
  },
  {
    method: "get",
    route: "/wallets/:id",
    controller: WalletController,
    action: "one",
    validation: [param("id").isInt()],
  },
  {
    method: "post",
    route: "/wallets",
    controller: WalletController,
    action: "save",
    validation: [
      body("walletNumber").isString(),
      body("userId").isString(),
      body("accountBalance").isInt()
    ],
  },
  {
    method: "delete",
    route: "/wallets/:id",
    controller: WalletController,
    action: "remove",
    validation: [param("id").isInt()],
  },
   //TRANSACTIONS
   {
    method: "get",
    route: "/transactions",
    controller: TransactionController,
    action: "all",
    validation: [],
  },
  {
    method: "get",
    route: "/transactions/:id",
    controller: TransactionController,
    action: "one",
    validation: [param("id").isInt()],
  },
  {
    method: "post",
    route: "/transactions/d",
    controller: TransactionController,
    action: "deposit",
    validation: [
      body("walletId").isString(),
      body("amount").isInt(),
    ],
  },
  {
    method: "post",
    route: "/transactions/w",
    controller: TransactionController,
    action: "withdraw",
    validation: [
      body("walletId").isString(),
      body("amount").isInt()
    ],
  },
  {
    method: "post",
    route: "/transactions/t",
    controller: TransactionController,
    action: "transfer",
    validation: [
      body("walletId").isString(),
      body("debittedWalletId").isString(),
      body("amount").isInt()
    ],
  },
  {
    method: "delete",
    route: "/transactions/:id",
    controller: TransactionController,
    action: "remove",
    validation: [param("id").isInt()],
  },
];
