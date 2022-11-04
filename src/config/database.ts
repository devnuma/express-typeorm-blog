import { DataSource } from "typeorm";
import { Comment } from "../models/comment.model";
import { PostModel } from "../models/post.model";
import { User } from "../models/user.model";

const appDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "asus2022",
  database: process.env.POSTGRES_DB || "postgres",
  entities: [User, PostModel, Comment],
  synchronize: true,
});

export { appDataSource };
