import { PrismaClient } from "@prisma/client";
import { hash, compare } from "bcrypt";
import User from "./user";

export default class PrismaService{
    private static instance: PrismaService;
    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    public static getInstance(): PrismaService {
        if (!PrismaService.instance) {
            PrismaService.instance = new PrismaService();
        }
        return PrismaService.instance;
    }

    async createUser(email: string, password: string){
        let hashedPassword = await hash(password, 12);
        await this.prisma.user.create({data: {email: email, password: hashedPassword}});
    }

    async findById(providedId: string){
        const user = await this.prisma.user.findUnique({where: {id: providedId}});
        if(user?.id !== undefined && user.email !== undefined && user.password !== undefined){
            return new User(user.email, user.password, user.id);
        }
    }

    async disconnect(){
        await this.prisma.$disconnect();
    }
}