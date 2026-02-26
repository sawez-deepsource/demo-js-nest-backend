import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const parsed = parseInt(value, 10)
    if (isNaN(parsed)) {
      throw new BadRequestException(`"${value}" is not a valid integer`)
    }
    return parsed
  }
}
