import { IsString } from "class-validator"

export class CreateAuthDto {
  @IsString()
  email: string

  @IsString()
  password: string
}

export class ReturnDataTokenDto{
  id:number

  email: string
}

export class TokenDto {    
  data: ReturnDataTokenDto

  iat: number

  exp: number
}
