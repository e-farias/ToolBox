import { Entity, Timestamp, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import bcrytp from "bcryptjs";

@Entity("users")
class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  name: string;
  
  @Column()
  email: string;
  
  @Column()
  phone: string;
  
  @Column({ default: "user" })
  role: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrytp.hashSync(this.password, 12);
  }
  
  @Column("timestamp")
  created_at: Timestamp;
  
  @Column("timestamp")
  updated_at: Timestamp;
  
  @Column("timestamp")
  deleted_at: Timestamp;

}

export default User;
