import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Polo from './Polo';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Polo, polo => polo.images)
    @JoinColumn({ name: 'polo_id' })
    polo: Polo;
}