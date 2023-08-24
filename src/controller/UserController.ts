import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { compare, hash } from "bcryptjs";
import { API_DOMAIN, DOMAIN } from "../config";
import { Status, User } from "../entity/User";
import { Wallet } from "../entity/Wallet";
const ejs = require("ejs");
const path = require("path");
import sendMail from "../functions/email-sender";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);
  private walletRepository = AppDataSource.getRepository(Wallet);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return "unregistered user";
    }
    return user;
  }

  async verify(request: Request, response: Response, next: NextFunction) {
    const username = request.params.username;

    const user = await this.userRepository.findOne({
      where: { username: username },
    });

    if (!user) {
      return { message: "Cannot find user" };
    } else if (user.status == "enable") {
      return { message: "User already verified Successfully" };
    }

    await this.userRepository.update(
      {
        id: user.id,
      },
      {
        status: Status.ENABLE,
      }
    );

    return { message: "User Verified Successfully" };
  }

  async register(request: Request, response: Response, next: NextFunction) {
    const {
      username,
      firstname,
      lastname,
      middlename,
      dob,
      email,
      gender,
      pass,
    } = request.body;

    const status = "invite";
    var role;
    if (email == "elangolawrence@gmail.com") {
      role = "admin";
    } else {
      role = "user";
    }
    const password = await hash(pass, 10);

    const user = Object.assign(new User(), {
      username,
      firstname,
      lastname,
      middlename,
      dob,
      email,
      gender,
      password,
      status,
      role,
    });

    await this.userRepository.save(user);

    //create wallet with balance of zero

    const walletId = user.id + user.username;
    const wallet = Object.assign(new Wallet(), {
      walletNumber: walletId,
      userId: user.id,
      walletBalance: 0,
    });

    await this.walletRepository.save(wallet);

    // Send the email to the user with a invitation link

    const emailTemplate = await ejs.renderFile(
      path.join(__dirname, "../templates/emailTemplate.ejs"),
      {
        user: `${user.username}`,
        email: `${user.email}`,
        title: "Invitation | IVORPAY",
        stageOneText:
          "Invitation to Ivorpay Wallet Network,please click the button below to accept the invitation (" +
          `${user.username}`,
        stageOneButtonText: "Accept Invitation",
        url: `${API_DOMAIN}/users/ver/${user.username}`,
      }
    );

    delete user.password;

    await sendMail(user.email, "Invitation to IvorPay", emailTemplate);

    return user;
  }

  async invite(request: Request, response: Response, next: NextFunction) {
    const { email } = request.body;

    // Send the email to the user urging them to register

    const emailTemplate = await ejs.renderFile(
      path.join(__dirname, "../templates/emailTemplate.ejs"),
      {
        user: `User`,
        email: `${email}`,
        title: "Invitation | IVORPAY",
        stageOneText: "Hop on the IVORPAY TRAIN (" + `User`,
        stageOneButtonText: "Accept Invitation",
        url: `${DOMAIN}/register`,
      }
    );

    await sendMail(email, "Invitation to IvorPay", emailTemplate);

    return { message: "Invitation sent" };
  }

  async login(request: Request, response: Response, next: NextFunction) {
    const { username, password } = request.body;

    const user = await this.userRepository.findOne({
      where: { username: username },
    });

    if (!user) {
      throw Error("User not found");
    }

    if (!(await compare(password, user.password))) {
      throw Error("Password mismatch");
    }

    return user;
  }

  async logout(request: Request, response: Response, next: NextFunction) {
    const { username } = request.body;

    return { message: "Logout succcessful" };
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      throw Error("this user not exist");
    }

    await this.userRepository.remove(userToRemove);

    return { message: "user has been removed" };
  }
}
