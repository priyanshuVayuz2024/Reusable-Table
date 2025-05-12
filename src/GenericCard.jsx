import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    Avatar,
    Tooltip,
} from "@mui/material";
import { InsertDriveFile } from "@mui/icons-material";
import React from "react";

export const GenericCard = ({ data }) => {
    console.log(data, 'hmm');


    return (
        <Card elevation={0} className="rounded-2xl shadow-lg border border-gray-200 mb-6">
            <CardContent>
                <div className="flex justify-between items-center mb-2">
                    <Typography variant="h6" className="font-bold">{data?.heading}</Typography>
                    {data?.badge && (
                        <Chip label={data?.badge.label} size="small" color={data?.badge.color} />
                    )}
                </div>

                {data?.subheading && (
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        {data?.subheading}
                    </Typography>
                )}

                {data?.image && (
                    <CardMedia
                        component="img"
                        height="160"
                        image={data?.image || "/anacity.svg"}
                        alt={data?.heading}
                        className="min-h-[172px] rounded-lg my-2 p-6 bg-gray-50 !object-contain"
                    />
                )}

                {data?.secondaryText && (
                    <Typography variant="body2" className="text-gray-700 mb-2">
                        {data?.secondaryText}
                    </Typography>
                )}

                {data?.attachments?.length > 0 && (
                    <div className="flex gap-2 my-3">
                        {data?.attachments.map((file, idx) => (
                            <Tooltip key={idx} title={file}>
                                <Avatar variant="rounded" className="bg-gray-200 text-gray-700">
                                    <InsertDriveFile />
                                </Avatar>
                            </Tooltip>
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mt-3">
                    {data?.fields.map((field, index) => (
                        <React.Fragment key={index}>
                            <div>{field.label}:</div>
                            <div className={field.valueClass || ""}>{field.value}</div>
                        </React.Fragment>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};