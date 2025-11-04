import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Meeting from "./Meeting";

@Table({
    underscored: true,
    tableName: 'development_teams'
})
export default class DevelopmentTeam extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string

    @HasMany(() => Meeting, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    meetings: Meeting[]

}
